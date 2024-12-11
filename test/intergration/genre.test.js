const request = require("supertest");
const { Genre } = require("../../models/genre");

let server;
describe("/api/course", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();

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
