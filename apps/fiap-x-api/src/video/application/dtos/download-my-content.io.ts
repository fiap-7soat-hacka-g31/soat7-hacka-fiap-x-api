import { IsEnum, IsString } from 'class-validator';

export class DownloadMyContentInput {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly ownerId: string;

  @IsString()
  @IsEnum(['zip', 'video'])
  public readonly target: string;
}

export class DownloadMyContentOutput {
  downloadSignedUrl: string;

  constructor(values: DownloadMyContentOutput) {
    Object.assign(this, values);
  }
}
