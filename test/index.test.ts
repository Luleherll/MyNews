import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src";



chai.should();
chai.use(chaiHttp);
describe('Server is running', () => {

  it('should response with STATUS: 200', (done) => {
    chai.request(server)
      .get("/api/v1/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  });
});