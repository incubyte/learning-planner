import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('CourseController (e2e)', () => {
  let app: INestApplication;
  let authToken;

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

  it('course/getAllCourse (GET) - should return all courses', async () => {
    const response = await request(app.getHttpServer())
      .get('course/getAllCourse')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });
});
