import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

import DB from "../../src/models";
import { newUser} from "../mocks";
import { JwtUtil } from "../../src/utils";
import { userValidator } from "../../src/middleware";

const { expect } = chai;
chai.use(chaiHttp);

describe("User Validator", () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it("should add user object to request body", async () => {
      sandBox.stub(DB.User, "findOne").returns(newUser);
      const nextSpy = sinon.spy();
      await userValidator({ route: { path: '/login' }, body: { user: { email: 'test@dev.com' } }}, {}, nextSpy)

      expect(nextSpy.calledWith()).to.be.true;
    });

    it("should return error if user exists on signup", async () => {
      sandBox.stub(DB.User, "findOne").returns(newUser);
      const nextSpy = sinon.spy();
      await userValidator({ route: { path: '/signup' }, body: { user: { email: 'test@dev.com' } }}, {}, nextSpy)

      expect(nextSpy.calledWith({error: "User already exists.", status: 400})).to.be.true;
    });

    it("should return error if user does not exist [except on signup]", async () => {
      sandBox.stub(DB.User, "findOne").returns(null);
      const nextSpy = sinon.spy();
      await userValidator({ route: { path: '/login' }, body: { user: { email: 'test@dev.com' } }}, {}, nextSpy)

      expect(nextSpy.calledWith({ error: 'User is not registered.', status: 400 })).to.be.true;
    });
});