import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src";

const { expect } = chai;
chai.use(chaiHttp);
describe("Server is running", () => {
  it("should response with STATUS: 200", async () => {
    const response = await chai.request(server).get("/api/v1/");
    expect(response).to.have.status(200);
  });
});
