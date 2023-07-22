const dotenv = require('dotenv');
const request = require('supertest');
const app = require('../server/app');
const db = require('../db');
dotenv.config();
// Jest global timeout configuration for asynchronous operations
jest.setTimeout(60000); // Set a higher timeout value
const config = require('../config');

describe("User APIs", () => {
  beforeAll(async () => {
    await config.load();
    await db.mongoConnect();
  });
  test("POST /login -> returns validation error", async () => {
    const res = await request(app).post("/v1/user/login").send({});
    expect(res.body.status).toBe("VALIDATION_ERROR");
    expect(res.statusCode).toBe(422);
  }, 5000);

  test("POST /login -> returns Success", async () => {
    const res = await request(app).post("/v1/user/login").send({
      username: "mark"
    });
    expect(res.body.status).toBe("SUCCESS");
    expect(res.statusCode).toBe(200);
  }, 50000);
});
