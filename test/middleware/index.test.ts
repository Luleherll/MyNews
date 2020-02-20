import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { dbConnection, handleErrors } from "../../src/middleware";
import { errorHandlers, Response } from "../../src/utils";
import { createErrorObject } from "../../src/utils/errorHandlers";
import { Logger } from "../../src/config";

const { expect } = chai;
chai.use(chaiHttp);

describe("Global middleware", () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  describe("DB connection", () => {
    it("should return error if DB is not connected", async () => {
      const error = { message: "DB not connected." };
      sandBox.stub(errorHandlers, "checkDbConnection").returns(error);
      const nextSpy = sinon.spy();
      await dbConnection({}, {}, nextSpy);

      expect(nextSpy.calledWith(error)).to.be.true;
    });

    it("should pass if db is connected", async () => {
      sandBox.stub(errorHandlers, "checkDbConnection").returns(null);
      const nextSpy = sinon.spy();
      await dbConnection({}, {}, nextSpy);

      expect(nextSpy.calledWith()).to.be.true;
    });
  });

  describe("Handle errors", () => {
    it("should return error", async () => {
      const nextSpy = sandBox.stub(Response, "failure").returns(null);
      const error = createErrorObject('It is broken', 400);
      await handleErrors(error, {}, {}, {});

      expect(nextSpy.calledOnce).to.be.true;
    });

    it("should log error if it is uncaught", async () => {
      sandBox.stub(Response, "failure").returns(null);
      const nextSpy = sandBox.stub(Logger, "error").returns(null);
      await handleErrors({} as any, {}, {}, {});

      expect(nextSpy.calledWith({})).to.be.true;
    });
  });
});
