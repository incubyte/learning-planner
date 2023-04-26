import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const user = {
      email: 'john' + Math.random() * 1000 + '@incubyte.co',
      password: '123',
    };
    await request(app.getHttpServer()).post('/auth/signup').send(user);
    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user);
    authToken = signInResponse.text;
  });

  it('user/ (GET) - should return the user', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('user/course/ (GET) - should return the course for particular userId', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/course?status=active')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('user/updateProfile/ (PATCH) - should update the user', async () => {
    const response = await request(app.getHttpServer())
      .patch('/user/updateProfile')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });
});
