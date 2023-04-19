import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('CourseController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  jest.setTimeout(30000);
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const user = {
      email: 'john' + Math.random() * 1000 + '@incubyte.co',
      password: '123',
      eId: 'E00' + Math.random() * 1000,
      role: 'SC',
      clientTeam: 'Learning Planner',
    };

    await request(app.getHttpServer()).post('/auth/signup').send(user);
    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user);
    authToken = signInResponse.text;
  });

  it('tag/ (GET) - should return all tags', async () => {
    const response = await request(app.getHttpServer())
      .get('/tag/')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('tag/:id (GET) - should return tags which id is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/tag/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });
});
