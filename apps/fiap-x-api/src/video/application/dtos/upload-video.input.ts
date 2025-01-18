export class UploadVideoInput {
  filename: string;
  mimetype: string;
  content: Buffer<ArrayBufferLike>;
  ownerId: string;
}

export class UploadVideoOutput {
  id: string;
}
