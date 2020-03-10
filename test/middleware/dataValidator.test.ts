import chai from "chai";
import chaiHttp from "chai-http";

import server from "../../src";

const { expect } = chai;
chai.use(chaiHttp);

describe('Data Validator', () => {
  it("should check for 'user' object presence", async () => {
    const response = await chai
      .request(server)
      .post("/api/v1/signup")
      .send({});
    expect(response).to.have.status(400);
  });

  it("should validate user data", async () => {
    const response = await chai
      .request(server)
      .post("/api/v1/signup")
      .send({email: "invalid" });

    expect(response).to.have.status(400);
  });
});