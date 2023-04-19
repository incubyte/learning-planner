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
});
