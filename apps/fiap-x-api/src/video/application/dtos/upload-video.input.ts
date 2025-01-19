import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class UploadVideoInput {
  filename: string;
  content: Buffer<ArrayBufferLike>;
  ownerId: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  snapshotIntervalInSeconds?: number;
}

export class UploadVideoOutput {
  id: string;
}
