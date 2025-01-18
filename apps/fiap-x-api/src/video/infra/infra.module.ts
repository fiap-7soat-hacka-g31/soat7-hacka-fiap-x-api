import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from '../application/abstractions/storage.service';
import { VideoRepository } from '../application/abstractions/video.repository';
import { MongooseVideoSchemaFactory } from './persistence/mongoose/video-schema.factory';
import { MongooseVideoRepository } from './persistence/mongoose/video.repository';
import {
  MongooseVideoSchema,
  MongooseVideoSchemaModel,
} from './persistence/mongoose/video.schema';
import { AwsS3StorageService } from './storage/aws-s3/aws-s3-storage.service';

const MongooseSchemaModule = MongooseModule.forFeature([
  {
    name: MongooseVideoSchema.name,
    schema: MongooseVideoSchemaModel,
  },
]);

MongooseSchemaModule.global = true;

@Module({
  imports: [MongooseSchemaModule],
  providers: [
    MongooseVideoSchemaFactory,
    {
      provide: VideoRepository,
      useClass: MongooseVideoRepository,
    },
    {
      provide: StorageService,
      useClass: AwsS3StorageService,
    },
    {
      provide: S3Client,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new S3Client({
          region: config.get('AWS_REGION'),
          credentials: {
            accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
            sessionToken: config.get('AWS_SESSION_TOKEN'),
          },
        });
      },
    },
  ],
  exports: [VideoRepository, StorageService],
})
export class InfraModule {}
