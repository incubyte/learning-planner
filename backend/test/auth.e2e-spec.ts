import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('/signup (POST) - should return the created user', async () => {
        const user = {
          email: 'john@incubyte.co',
          password: '123',
        };
        const res = await request(app.getHttpServer())
          .post('/signup')
          .send(user)
          .expect(201);

  });
  
  it('/signin (POST) - should return the token for loggedin user', async () => {
          const user = {
            email: 'john@incubyte.co',
            password: '123',
          };
          
          const res = await request(app.getHttpServer())
            .post('/signin')
            .send(user)
            .expect(201)      
  });
});
