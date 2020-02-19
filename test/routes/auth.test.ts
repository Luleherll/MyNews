import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import sendGrid from "@sendgrid/mail";

import server from "../../src";
import DB from "../../src/models";
import { newUser, userObj, accessToken } from "../mocks";
import { JwtUtil } from "../../src/utils";
import Queries from "../../src/lib/queries";


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
      sandBox.stub(sendGrid, "send").resolves({});

      const response = await chai
        .request(server)
        .post("/api/v1/signup")
        .send({ user: userObj });

      expect(response).to.have.status(201);
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

  describe('Email verfication', () => {
    it('should be successful', async() => {
      sandBox.stub(DB.User, "findOne").returns(newUser);
      sandBox.stub(Queries, "update").returns(Promise.resolve(newUser));
      sandBox.stub(JwtUtil, "decodeToken").returns({ error: null, value: "test@dev.com" });
      sandBox.stub(JwtUtil, "getAuthToken").returns(accessToken);

      const response = await chai
        .request(server)
        .get("/api/v1/verify-email")
        .query({ code: accessToken })
      expect(response).to.have.status(200);
    });
    });
});
