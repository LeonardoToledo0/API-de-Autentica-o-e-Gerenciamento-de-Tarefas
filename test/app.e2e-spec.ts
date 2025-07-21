/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as http from 'http';
import { AppModule } from '../src/app.module';

interface LoginResponse {
  access_token: string;
}

interface ValidationErrorResponse {
  statusCode: number;
  message: string[] | string;
  error: string;
}

interface UserResponse {
  id: string;
  email: string;
  username: string;
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let server: http.Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    server = app.getHttpServer() as http.Server;

    await request(server)
      .post('/auth/user')
      .send({
        email: 'user@example.com',
        password: 'validpassword',
        username: 'testuser',
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const response = await request(server)
        .post('/auth/login')
        .send({ email: 'user@example.com', password: 'validpassword' });

      expect(response.status).toBe(200);
      const body: LoginResponse = response.body;
      expect(body).toHaveProperty('access_token');
      expect(typeof body.access_token).toBe('string');
    });

    it('should fail login with invalid credentials', async () => {
      await request(server)
        .post('/auth/login')
        .send({ email: 'wrong@example.com', password: 'wrongpass' })
        .expect(401);
    });

    it('should fail login with missing fields', async () => {
      await request(server)
        .post('/auth/login')
        .send({ email: 'user@example.com' })
        .expect(400);
    });
  });

  describe('POST /auth/user', () => {
    it('should return 201 when sending valid user data', async () => {
      const newUser = {
        email: 'validuser@example.com',
        password: 'strongpassword',
        username: 'validusername',
      };

      const response = await request(server)
        .post('/auth/user')
        .send(newUser)
        .expect(201);

      const body: UserResponse = response.body;
      expect(body).toHaveProperty('id');
      expect(body.email).toBe(newUser.email);
    });

    it('should return 400 when sending invalid email', async () => {
      const invalidUser = {
        email: 'not-an-email',
        password: 'strongpassword',
        username: 'validusername',
      };

      const response = await request(server)
        .post('/auth/user')
        .send(invalidUser)
        .expect(400);

      const body: ValidationErrorResponse = response.body;
      const message = Array.isArray(body.message) ? body.message.join(', ') : body.message;
      expect(message).toContain('Invalid email format');
    });

    it('should return 400 when password is too short', async () => {
      const invalidUser = {
        email: 'validuser@example.com',
        password: '123',
        username: 'validusername',
      };

      const response = await request(server)
        .post('/auth/user')
        .send(invalidUser)
        .expect(400);

      const body: ValidationErrorResponse = response.body;
      const message = Array.isArray(body.message) ? body.message.join(', ') : body.message;
      expect(message).toContain('Password must be at least 6 characters');
    });

    it('should return 400 when username is empty', async () => {
      const invalidUser = {
        email: 'validuser@example.com',
        password: 'strongpassword',
        username: '',
      };

      const response = await request(server)
        .post('/auth/user')
        .send(invalidUser)
        .expect(400);

      const body: ValidationErrorResponse = response.body;
      const message = Array.isArray(body.message) ? body.message.join(', ') : body.message;
      expect(message).toContain('Username is required');
    });
  });
});