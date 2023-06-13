const request = require('supertest');
const { startServer, closeServer } = require('./server');
const { expect } = require('chai'); 

let server;

before(async () => {
  server = await startServer();
});

after(async () => {
  await closeServer(server);
});

describe('GET /todos', () => {
  it('should return a list of todos', async () => {
    const response = await request(server).get('/todos');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});

describe('POST /todos', () => {
  it('should create a new todo', async () => {
    const response = await request(server)
      .post('/todos')
      .send({ title: 'Test Todo' });
    expect(response.status).to.equal(201);
    expect(response.body.success).to.be.true;
  });
});
