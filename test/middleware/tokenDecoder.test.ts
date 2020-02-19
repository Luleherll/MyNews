import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

import { accessToken } from "../mocks";
import { JwtUtil } from "../../src/utils";
import { tokenDecoder } from "../../src/middleware";

const { expect } = chai;
chai.use(chaiHttp);

describe("Token Decoder", () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it("should add user object to request body", async () => {
    sandBox.stub(JwtUtil, "decodeToken").returns({ error: null, value: "test@dev.com" });

    const nextSpy = sinon.spy();
    await tokenDecoder({ url: "/verify-email", body: {}, query: { code: accessToken } }, {}, nextSpy);

    expect(nextSpy.calledWith()).to.be.true;
  });

  it("should return error if token is expired", async () => {
    sandBox.stub(JwtUtil, "decodeToken").returns({ error: "jwt expired", value: null });

    const nextSpy = sinon.spy();
    await tokenDecoder({ url: "/verify-email", body: {}, query: { code: accessToken } }, {}, nextSpy);

    expect(nextSpy.calledWith({ error: "Link has expired.", status: 400 })).to.be.true;
  });

  it("should return error if token decoding has failed", async () => {
    sandBox.stub(JwtUtil, "decodeToken").returns({ error: "invalid jwt", value: null });

    const nextSpy = sinon.spy();
    await tokenDecoder({ url: "/secured", body: {}, headers: { authorization: accessToken } }, {}, nextSpy);

    expect(nextSpy.calledWith("invalid jwt")).to.be.true;
  });
});
