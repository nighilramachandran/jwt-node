const { Users } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("user.generateAuthentication", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new Users(payload);
    const token = user.getAuthenticationToken();
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decode).toMatchObject(payload);
  });
});
