export class UploadVideoInput {
  filename: string;
  content: Buffer<ArrayBufferLike>;
  ownerId: string;
}

export class UploadVideoOutput {
  id: string;
}
