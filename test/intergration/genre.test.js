const request = require("supertest");
const { Genre } = require("../../models/genre");
const { Users } = require("../../models/user");

let server;
describe("/api/course", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();

    await Genre.deleteMany({ item: "genre1", price: 5 });
    await Genre.deleteMany({ item: "genre2", price: 40 });
  });

  it("should return all genres", async () => {
    await Genre.collection.insertMany([
      { item: "genre1", price: 5 },
      { item: "genre2", price: 40 },
    ]);
    const res = await request(server).get("/api/course");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

describe("POST /", () => {
  it("should return 401 if the user is not logged in", async () => {
    const res = await request(server).post("/api/course").send({
      name: "genre1",
    });
    expect(res.status).toBe(401);
  });

  it("should return 400 if the genre is less than 5 characters", async () => {
    const token = new Users().getAuthenticationToken();
    const res = await request(server)
      .post("/api/course")
      .set("x-auth-token", token)
      .send({
        name: "genre1",
      });
    expect(res.status).toBe(400);
  });
});
