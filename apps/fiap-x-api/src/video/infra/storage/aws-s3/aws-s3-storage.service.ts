import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  StorageService,
  UploadVideoResult,
} from '../../../application/abstractions/storage.service';

@Injectable()
export class AwsS3StorageService implements StorageService {
  constructor(
    private readonly s3Client: S3Client,
    private readonly config: ConfigService,
  ) {}

  async uploadVideoForUser(
    path: string,
    content: Buffer<ArrayBufferLike>,
  ): Promise<UploadVideoResult> {
    const bucket = this.config.get('AWS_S3_BUCKET_NAME');
    const provider = 'AWS::S3';
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: path,
      Body: content,
    });
    await this.s3Client.send(command);
    return {
      provider,
      bucket,
      path,
    };
  }
}
