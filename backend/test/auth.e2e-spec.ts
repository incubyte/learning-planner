import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const user = {
    email: 'john' + Math.random() * 1000 + '@incubyte.co',
    password: '123',
    eId: 'E00' + Math.random() * 1000,
    role: 'SC',
    clientTeam: 'Learning Planner',
  };

  it('auth/signup (POST) - should return the created user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(user);
    expect(response.status).toBe(201);
  });

  it('/signin (POST) - should return the token for loggedin user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user);
    expect(response.status).toBe(201);
  });

  const admin = {
    email: 'testadmin@incubyte.co',
    password: 'Incubyte@111',
    eId: 'E0000',
    role: 'SC',
    clientTeam: 'Learning Planner',
  };

  it('/admin/signin (POST) - should return the token for loggedin admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/admin/signin')
      .send(admin);
    expect(response.status).toBe(201);
  });

  it('/forgotPasswordAdmin (POST) - should send email to admin', async () => {
    const user = {
      email: 'john@incubyte.co',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/admin/forgotPassword')
      .send(user);
    expect(response.status).toBe(400);
  });

  it('/forgotPassword (POST) - should send email to user', async () => {
    const user = {
      email: 'john@incubyte.co',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/forgotPassword')
      .send(user);
    expect(response.status).toBe(400);
  });
});
