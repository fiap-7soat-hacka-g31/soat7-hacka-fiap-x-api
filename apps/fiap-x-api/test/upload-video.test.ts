import { destroyTestApp } from '@fiap-x/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { createTestApp } from './create-app';
import { getBearerToken } from './utils/get-bearer-token';
import { getVideoPath } from './utils/utils';

describe('POST /v1/videos/upload', () => {
  let app: INestApplication;
  let server: App;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  it('should upload a new video', async () => {
    const bearer = await getBearerToken(app);
    const response = await request(server)
      .post('/v1/videos/upload')
      .attach('file', getVideoPath())
      .set('Authorization', bearer);
    const { statusCode, body } = response;
    expect(statusCode).toBe(201);
    expect(body).toEqual({ id: expect.any(String) });
  });

  it('should return 409 if video already exists', async () => {
    const bearer = await getBearerToken(app);
    const makeRequest = () =>
      request(server)
        .post('/v1/videos/upload')
        .attach('file', getVideoPath())
        .set('Authorization', bearer);
    await makeRequest();
    const response = await makeRequest();
    const { statusCode } = response;
    expect(statusCode).toBe(409);
  });
});
