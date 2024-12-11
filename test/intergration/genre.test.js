const request = require("supertest");

let server;
describe("/api/course", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => server.close());
  it("should return all genres", async () => {
    const res = await request(server).get("/api/course");
    expect(res.status).toBe(200);
  });
});
