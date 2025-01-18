import {
  UploadVideoInput,
  UploadVideoOutput,
} from '../dtos/upload-video.input';

export class UploadVideoCommand {
  constructor(readonly data: UploadVideoInput) {}
}

export class UploadVideoResult {
  constructor(readonly data: UploadVideoOutput) {}
}
