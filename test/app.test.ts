import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect("I'm okay!");
  });

  it('/auth/sign-up (POST)', () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201)
  });

  // Testes de Auth

  it('/auth/login (POST)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);
  });

  it('/auth/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/users')
      .expect(200);
  });

  // Testes de Posts

  it('/posts (POST)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    return await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200);
  });

  it('/posts/:id (GET)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    const response = await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);

    return await request(app.getHttpServer())
      .get(`/posts/${response.body.id}`)
      .expect(200);
  });

  it('/posts/:id (PUT)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    const response = await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);

    const postUpdated = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    return await request(app.getHttpServer())
      .put(`/posts/${response.body.id}`)
      .send(postUpdated)
      .expect(200);
  });

  it('/posts/:id (DELETE)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    const response = await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);

    return await request(app.getHttpServer())
      .delete(`/posts/${response.body.id}`)
      .expect(200);
  });

  // Testes de Medias
  it('/medias (POST)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    return await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);
  });

  it('/medias (GET)', () => {
    return request(app.getHttpServer())
      .get('/medias')
      .expect(200);
  });

  it('/medias/:id (GET)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    const response = await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);

    return await request(app.getHttpServer())
      .get(`/medias/${response.body.id}`)
      .expect(200);
  });

  it('/medias/:id (PUT)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    const response = await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);

    const mediaUpdated = {
      title: faker.lorem.words(3),
      username: user.username
    };

    return await request(app.getHttpServer())
      .put(`/medias/${response.body.id}`)
      .send(mediaUpdated)
      .expect(200);

  });

  it('/medias/:id (DELETE)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    const response = await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);

    return await request(app.getHttpServer())
      .delete(`/medias/${response.body.id}`)
      .expect(200);

  });

  // Testes de Publications
  it('/publications (POST)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    const responseMedia = await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    const responsePost = await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);

    const publication = {
      mediaId: responseMedia.body.id,
      postId: responsePost.body.id
    };

    return await request(app.getHttpServer())
      .post('/publications')
      .send(publication)
      .expect(201);
  });

  it('/publications (GET)', () => {
    return request(app.getHttpServer())
      .get('/publications')
      .expect(200);
  });

  it('/publications/:id (GET)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    const responseMedia = await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    const responsePost = await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);

    const publication = {
      mediaId: responseMedia.body.id,
      postId: responsePost.body.id
    };

    const response = await request(app.getHttpServer())
      .post('/publications')
      .send(publication)
      .expect(201);

    return await request(app.getHttpServer())
      .get(`/publications/${response.body.id}`)
      .expect(200);

  });

  it('/publications/:id (PUT)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    const responseMedia = await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    const responsePost = await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);

    const publication = {
      mediaId: responseMedia.body.id,
      postId: responsePost.body.id
    };

    const response = await request(app.getHttpServer())
      .post('/publications')
      .send(publication)
      .expect(201);

    const publicationUpdated = {
      mediaId: responseMedia.body.id,
      postId: responsePost.body.id
    };

    return await request(app.getHttpServer())
      .put(`/publications/${response.body.id}`)
      .send(publicationUpdated)
      .expect(200);
  });

  it('/publications/:id (DELETE)', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: faker.internet.url()
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);

    const media = {
      title: faker.lorem.words(3),
      username: user.username
    };

    const responseMedia = await request(app.getHttpServer())
      .post('/medias')
      .send(media)
      .expect(201);

    const post = {
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
    };

    const responsePost = await request(app.getHttpServer())
      .post('/posts')
      .send(post)
      .expect(201);

    const publication = {
      mediaId: responseMedia.body.id,
      postId: responsePost.body.id
    };

    const response = await request(app.getHttpServer())
      .post('/publications')
      .send(publication)
      .expect(201);

    return await request(app.getHttpServer())
      .delete(`/publications/${response.body.id}`)
      .expect(200);
  });
});
