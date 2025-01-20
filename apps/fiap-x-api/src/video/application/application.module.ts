import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { UploadVideoHandler } from './commands/upload-video.handler';

const QueryHandlers = [];
const CommandHandlers = [UploadVideoHandler];

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ApplicationModule {}
