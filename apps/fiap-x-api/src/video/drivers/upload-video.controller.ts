import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadVideoCommand } from '../application/commands/upload-video.command';

const ONE_HUNDRED_MEGABYTES = 1000 * 1000 * 100;

@Controller({ version: '1', path: 'videos' })
export class UploadVideoController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async execute(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: ONE_HUNDRED_MEGABYTES }),
          new FileTypeValidator({ fileType: 'video/mp4' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.commandBus.execute(
      new UploadVideoCommand({
        ownerId: '6592008029c8c3e4dc76256c',
        filename: file.originalname,
        content: file.buffer,
      }),
    );
    return result.data;
  }
}
