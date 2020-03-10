import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import sendGrid from "@sendgrid/mail";

import server from "../../src";
import DB from "../../src/models";
import { newUser, userObj, accessToken, unverifiedUser } from "../mocks";
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
        .send(userObj);

      expect(response).to.have.status(200);
    });

    it("should not register USER more than once", async () => {
      sandBox.stub(DB.User, "findOne").returns(newUser);

      const response = await chai
        .request(server)
        .post("/api/v1/signup")
        .send(userObj);
      expect(response).to.have.status(400);
    });
  });

  describe('email verfication', () => {
    it('should be successful', async() => {
      sandBox.stub(DB.User, "findOne").returns(newUser);
      sandBox.stub(Queries, "update").returns(Promise.resolve(newUser));
      sandBox.stub(JwtUtil, "decodeToken").returns({ error: null, value: { user: "test@dev.com" } });
      sandBox.stub(JwtUtil, "getAuthToken").returns({accessToken, user: {}});

      const response = await chai
        .request(server)
        .get("/api/v1/verify-email")
        .query({ code: accessToken })
      expect(response).to.have.status(201);
    });
    });

    describe("login", () => {
      it("should be successful", async () => {
        sandBox.stub(DB.User, "findOne").returns(newUser);
        sandBox.stub(JwtUtil, "getAuthToken").returns({accessToken, user: {}});
        sandBox.stub(JwtUtil, "getRefreshToken").returns({ refreshToken: accessToken, user: {}});

        const response = await chai
          .request(server)
          .post("/api/v1/login")
          .send({email: userObj.email, password: userObj.password });
        expect(response).to.have.status(200);
      });
  
      it("should not authenticate unverified USER", async () => {
        sandBox.stub(DB.User, "findOne").returns(unverifiedUser);
        sandBox.stub(sendGrid, "send").resolves({});
        // const spy = sinon.spy(JwtUtil, 'getAuthToken');
  
        const response = await chai
          .request(server)
          .post("/api/v1/login")
          .send({ email: userObj.email, password: userObj.password });
        expect(response).to.have.status(200);
        // expect(spy.notCalled).to.be.true;
      });
    });

    describe('Refresh token', () => {
      it('should return new access token', async() => {
        sandBox.stub(DB.User, "findOne").returns(newUser);
        sandBox.stub(JwtUtil, "decodeToken").returns({ error: null, value: newUser.id });

        const response = await chai
          .request(server)
          .get("/api/v1/refresh-token")
          .set({'Authorization': accessToken})
        expect(response).to.have.status(200);
      });
    });

    describe('Reset password', () => {
      it('should send password reset email', async() => {
        sandBox.stub(DB.User, "findOne").returns(newUser);
        sandBox.stub(sendGrid, "send").resolves({});
        sandBox.stub(JwtUtil, "getAuthToken").returns({accessToken, user: {}});

        const response = await chai
          .request(server)
          .post("/api/v1/reset-password")
          .send({ email: userObj.email, password: userObj.password, confirmPassword: userObj.password });
        expect(response).to.have.status(200);
      });

      it('should return new access token', async() => {
        sandBox.stub(DB.User, "findOne").returns(newUser);
        sandBox.stub(JwtUtil, "decodeToken").returns({ error: null, value: { email: newUser.filtered().email, password: 'testpass'} });
        sandBox.stub(JwtUtil, "getAuthToken").returns({accessToken, user: {}});

        const response = await chai
          .request(server)
          .get("/api/v1/reset-password")
          .query({ code: accessToken })
        expect(response).to.have.status(200);
      });
    });
});
