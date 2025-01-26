import { Transactional } from '@fiap-x/tactical-design/core';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StorageService } from '../abstractions/storage.service';
import { VideoRepository } from '../abstractions/video.repository';
import { ProcessSnapshotsResultCommand } from './process-snapshots-result.command';

@CommandHandler(ProcessSnapshotsResultCommand)
export class ProcessSnapshotsResultHandler
  implements ICommandHandler<ProcessSnapshotsResultCommand, void>
{
  constructor(
    private readonly storage: StorageService,
    private readonly repository: VideoRepository,
  ) {}

  @Transactional()
  async execute(command: ProcessSnapshotsResultCommand): Promise<void> {
    const { id, status, provider, bucket, path, failReason } =
      command.event.data;
    const aggregate = await this.repository.findById(id);
    if (!aggregate) {
      throw new NotFoundException();
    }
    let signedUrl: string = null;
    if (status === 'SUCCESS') {
      aggregate.appendZip(provider, bucket, path);
      signedUrl = await this.storage.createSignedUrlForDownload(path);
    }
    if (status === 'FAILED') {
      aggregate.reject(failReason);
    }

    aggregate.complete(signedUrl);

    await this.repository.update(aggregate);
    await aggregate.commit();
  }
}
