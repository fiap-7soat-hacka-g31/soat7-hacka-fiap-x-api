import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { UploadVideoCommandHandler } from './commands/upload-video.handler';

const QueryHandlers = [];
const CommandHandlers = [UploadVideoCommandHandler];

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ApplicationModule {}
