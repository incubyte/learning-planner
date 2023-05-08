import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  jest.setTimeout(30000);
  let app: INestApplication;
  let authToken: string;
  let user;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    user = {
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
      .get('/user/course')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ courses: [], count: 0 });
  });

  it('user/updateProfile/ (PATCH) - should update the user', async () => {
    const response = await request(app.getHttpServer())
      .patch('/user/updateProfile')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);

    expect(response.body.email).toEqual(user.email);
  });

  it('user/leaderboard/ (GET) - should return the top 5 users list', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/leaderboard')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('user/course/enroll/ (POST) - should enroll the course the user', async () => {
    const courseBody = {
      id: '67778aa0-945d-4864-873d-f29906cb6c4e',
    };

    const response = await request(app.getHttpServer())
      .post('/user/course/enroll')
      .send(courseBody)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(201);
    expect(response.body.courseId).toEqual(courseBody.id);
  });

  it('user/course/completeCourse/ (POST) - should make the course completed for the user', async () => {
    const courseBody = {
      id: '67778aa0-945d-4864-873d-f29906cb6c4e',
    };

    const response = await request(app.getHttpServer())
      .patch('/user/course/completeCourse')
      .send(courseBody)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.courseId).toEqual(courseBody.id);
    expect(response.body.isCompleted).toEqual(true);
  });

  it('user/status (GET) - should return the status of course for that users', async () => {
    const courseId = '67778aa0-945d-4864-873d-f29906cb6c4e';
    const response = await request(app.getHttpServer())
      .get('/user/course/status/:courseId')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });
});
