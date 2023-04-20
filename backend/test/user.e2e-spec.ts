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

  it('user/:userId (GET) - should return the user', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/0cecbf92-d381-40b7-b8f8-49ccae3f8263')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('user/course/:userId (GET) - should return the course for particular userId', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/course/0cecbf92-d381-40b7-b8f8-49ccae3f8263')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('user/updateProfile/:userId (PATCH) - should update the user', async () => {
    const response = await request(app.getHttpServer())
      .patch('/user/updateProfile/0cecbf92-d381-40b7-b8f8-49ccae3f8263')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });
});
