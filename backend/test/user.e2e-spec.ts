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
      email: 'utsav.p@incubyte.co',
      password: 'Incubyte@111',
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

  it('user/getUser/:id (GET) - should return the user by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/getUser/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(404);
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

    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('user/course/enroll/ (POST) - should enroll the course the user', async () => {
    const courseBody = {
      id: '1',
    };

    const response = await request(app.getHttpServer())
      .post('/user/course/enroll')
      .send(courseBody)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('course not found');
  });

  it('user/course/completeCourse/ (POST) - should make the course completed for the user', async () => {
    const courseBody = {
      id: '1',
    };

    const response = await request(app.getHttpServer())
      .patch('/user/course/completeCourse')
      .send(courseBody)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('user or course not found');
  });

  it('user/status (GET) - should return the status of course for that users', async () => {
    const courseId = '67778aa0-945d-4864-873d-f29906cb6c4e';
    const response = await request(app.getHttpServer())
      .get('/user/course/status/:' + courseId)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('user/add (POST) - should create the user Accessible to admin only', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/add')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(201);
  });

  it('user/update/:id (PATCH) - should update the user Accessible to admin only', async () => {
    const response = await request(app.getHttpServer())
      .patch('/user/update/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('user not found');
  });

  it('user/delete/:id (DELETE) - should delete the user Accessible to admin only', async () => {
    const response = await request(app.getHttpServer())
      .delete('/user/delete/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('user not found');
  });

  it('user/all (GET) - should return the all user Accessible to admin only', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/all')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
