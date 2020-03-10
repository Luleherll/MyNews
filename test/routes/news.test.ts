import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

import server from "../../src";
import DB from "../../src/models";
import Queries from "../../src/lib/queries";
import { newUser, accessToken, newPost } from "../mocks";
import { JwtUtil } from "../../src/utils";
import { SEQUELIZE_UNIQUE_CONSTRAINT } from "../../src/lib/constants/errors";


const { expect } = chai;
chai.use(chaiHttp);

describe('News', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  describe('create', () => {
    it('should be successful', async() => {
      sandBox.stub(DB.User, "findOne").returns(newUser);
      sandBox.stub(JwtUtil, "decodeToken").returns({ error: null, value: { user: "test@dev.com" } });
      const response = await chai
        .request(server)
        .post("/api/v1/news")
        .set({'Authorization': accessToken})
        .send(newPost)

      expect(response).to.have.status(201);
  });

  it('should not create same post more then once', async() => {
    sandBox.stub(DB.User, "findOne").returns(newUser);
    sandBox.stub(JwtUtil, "decodeToken").returns({ error: null, value: { user: "test@dev.com" } });
    sandBox.stub(newUser, "createNews").returns(Promise.reject({errors: [{ type: SEQUELIZE_UNIQUE_CONSTRAINT}]}));
    const response = await chai
      .request(server)
      .post("/api/v1/news")
      .set({'Authorization': accessToken})
      .send(newPost)

    expect(response).to.have.status(400);
});
  });

});