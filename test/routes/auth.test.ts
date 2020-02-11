import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

import server from "../../src";
import DB from "../../src/models";
import { newUser, userObj } from "../mocks";

const { expect } = chai;
chai.use(chaiHttp);

describe("User", () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });
  describe("signup", () => {
    it("should be successful", async () => {
      sandBox.stub(DB.User, "findOne").returns(null);
      sandBox.stub(DB.User, "create").returns(newUser);
      

      const response = await chai
        .request(server)
        .post("/api/v1/signup")
        .send({ user: userObj });
      expect(response).to.have.status(201);
    });

    it("should validate user data", async () => {
      sandBox.stub(DB.User, "findOne").returns(null);

      const response = await chai
        .request(server)
        .post("/api/v1/signup")
        .send({ user: { email: 'invalid' } });
      expect(response).to.have.status(400);
    });

    it("should validate user object", async () => {
      sandBox.stub(DB.User, "findOne").returns(null);

      const response = await chai
        .request(server)
        .post("/api/v1/signup")
        .send({});
      expect(response).to.have.status(400);
    });

    it("should not register USER more than once", async () => {
      sandBox.stub(DB.User, "findOne").returns(newUser);

      const response = await chai
        .request(server)
        .post("/api/v1/signup")
        .send({ user: userObj });
      expect(response).to.have.status(400);
    });
  });
});
