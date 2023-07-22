const dotenv = require('dotenv');
const request = require('supertest');
const app = require('../server/app');
const db = require('../db');
const user = require('../db/model/user');
const profile = require('../db/model/profile');
const profileFeedback = require('../db/model/profileFeedback');
const feedbackReaction = require('../db/model/feedbackReaction');
const { generateToken } = require('../services/users/helpers/generateToken');
dotenv.config();
const config = require('../config');
jest.setTimeout(60000);

describe("Profile APIs", () => {
  let token;
  let profileId;
  let feedbackId;
  beforeAll(async () => {
    await config.load();
    await db.mongoConnect();
    const users = await user.create({
      username: "mark"
    });
    token = await generateToken({ _id: users._id }, process.env.JWT_CLIENT_SECRET,);
    token = 'Bearer ' + token
    let profileData = await profile.create({
      "name": "Bapu",
      "description": "Bapu",
      "mbti": "ISFJ",
      "enneagram": "4w5",
      "variant": "sp/so",
      "tritype": "950",
      "socionics": "SEE",
      "sloan": "RCOEN",
      "psyche": "FEVL",
      "image": "https://soulverse.boo.world/images/1.png"
    });
    let feedbackData = await profileFeedback.create({
      "profileId": profileData._id,
      "userId": users._id,
      "comment": "No 1",
      "title": "Boss",
      "mbti": "ESTJ",
      "enneagram": "9w8",
      "zodiac": "Taurus"
    })
    await feedbackReaction.create({
      "profileId": profileData._id,
      "userId": users._id,
      "feedbackId": feedbackData._id,
      "isLiked": true
    })
    profileId = profileData._id
    feedbackId = feedbackData._id
  });
  test("POST / -> returns validation error", async () => {
    const res = await request(app).post("/v1/profile/").send({});
    expect(res.body.status).toBe("VALIDATION_ERROR");
    expect(res.statusCode).toBe(422);
  }, );

  test("POST / -> returns Success", async () => {
    const res = await request(app).post("/v1/profile/").send({
      "name": "Bapu",
      "description": "Bapu",
      "mbti": "ISFJ",
      "enneagram": "4w5",
      "variant": "sp/so",
      "tritype": "950",
      "socionics": "SEE",
      "sloan": "RCOEN",
      "psyche": "FEVL",
      "image": "https://soulverse.boo.world/images/1.png"
    });

    expect(res.body.status).toBe("SUCCESS");
    expect(res.statusCode).toBe(200);
  }, );

  test("POST /list -> returns validation error", async () => {
    const res = await request(app).post("/v1/profile/list").send({
      "page": 1,
      "pageSize": 'A'
    });
    expect(res.body.status).toBe("VALIDATION_ERROR");
    expect(res.statusCode).toBe(422);
  }, );

  test("POST /list -> returns Success", async () => {
    const res = await request(app).post("/v1/profile/list").send({
      "page": 1,
      "pageSize": 10
    });
    console.log(res.body)
    expect(res.body.status).toBe("SUCCESS");
    expect(res.statusCode).toBe(200);
  }, );

  test("POST /feedback/:profileId -> returns validation error", async () => {
    const res = await request(app).post(`/v1/profile/feedback/${profileId}`).send({
      "mbti": "ABCD",
    }).set("Authorization", token);
    expect(res.body.status).toBe("VALIDATION_ERROR");
    expect(res.statusCode).toBe(422);
  }, );

  test("POST /feedback/:profileId-> returns Success", async () => {
    const res = await request(app).post(`/v1/profile/feedback/${profileId}`).send({
      "comment":"No 1",
      "title":"Boss",
      "mbti":"ESTJ",
      "enneagram":"9w8",
      "zodiac":"Taurus"
    }).set("Authorization", token);
    expect(res.body.status).toBe("SUCCESS");
    expect(res.statusCode).toBe(200);
  }, );

  test("POST /reaction/:profileId/:feedbackId -> returns validation error", async () => {
    const res = await request(app).put(`/v1/profile/reaction/${profileId}/${feedbackId}`).send({}).set("Authorization", token);
    expect(res.body.status).toBe("VALIDATION_ERROR");
    expect(res.statusCode).toBe(422);
  }, );

  test("POST /reaction/:profileId/:feedbackId-> returns Success", async () => {
    const res = await request(app).put(`/v1/profile/reaction/${profileId}/${feedbackId}`).send({
      "isLiked": true,
    }).set("Authorization", token);
    expect(res.body.status).toBe("SUCCESS");
    expect(res.statusCode).toBe(200);
  }, );

  test("POST /details/:profileId -> returns validation error", async () => {
    const res = await request(app).post(`/v1/profile/details/${profileId}`).send({
      "sortBy": 1, // possible value "likes", 'createdAt'
    });
    expect(res.body.status).toBe("VALIDATION_ERROR");
    expect(res.statusCode).toBe(422);
  }, );

  test("POST /details/:profileId-> returns Success", async () => {
    const res = await request(app).post(`/v1/profile/details/${profileId}`).send({
      "sortBy": "likes",
    });
    expect(res.body.status).toBe("SUCCESS");
    expect(res.statusCode).toBe(200);
  }, );
});
