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
      email: 'shilpi@incubyte.co',
      password: 'Incubyte@111',
    };
    await request(app.getHttpServer()).post('/auth/signup').send(user);
    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user);
    authToken = signInResponse.text;
  });

  it('course/ (GET) - should return all courses', async () => {
    const response = await request(app.getHttpServer())
      .get('/course/')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('course/getCourseById/:id (GET) - should return course which id is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/course/getCourseById/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('course/filterByTags (GET) - should return courses which tags is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/course/filterByTags?tags=1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('course/popular (GET) - should return popular courses', async () => {
    const response = await request(app.getHttpServer())
      .get('/course/popular')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  const course = {
    name: 'Course' + Math.random() * 100,
    resourseUrls: ['resourceUrl1'],
    testUrls: ['testurl1'],
    imageUrl: 'image1',
    credit: 10,
    description: 'description',
    tags: [1, 3],
  };

  it('course/create (POST) - should create the course', async () => {
    const response = await request(app.getHttpServer())
      .post('/course/create')
      .send(course)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(201);
  });

  it('course/updateCourseById/:id (PATCH) - should update the course which is Accessible to admin only', async () => {
    const response = await request(app.getHttpServer())
      .patch('/course/updateCourseById/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Course does not exists');
  });

  it('course/delete/:id (DELETE) - should delete the course which is Accessible to admin only', async () => {
    const response = await request(app.getHttpServer())
      .delete('/course/delete/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('course not found');
  });
});
