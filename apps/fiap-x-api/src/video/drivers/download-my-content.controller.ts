import { AuthUser, User, WithAuthentication } from '@fiap-x/setup/auth';
import { ObjectIdValidationPipe } from '@fiap-x/tactical-design/mongoose';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { DownloadMyContentQuery } from '../application/query/download-my-content.query';

@WithAuthentication()
@Controller({ version: '1', path: 'me/videos/:id/download' })
export class DownloadMyContentController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async execute(
    @Param('id', new ObjectIdValidationPipe()) id: string,
    @AuthUser() user: User,
    @Query('target') target: string,
  ) {
    const result = await this.queryBus.execute(
      new DownloadMyContentQuery({
        id,
        ownerId: user.id,
        target,
      }),
    );
    return result.data;
  }
}
