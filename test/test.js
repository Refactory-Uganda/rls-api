const chai = require("chai");
const chaiHttp = require("chai-http");
const Courses = require("../routes/adminAddCoursesRoutes");
const Login = require("../routes/loginRoutes");
const Facilitator = require("../routes/facilitatorRoutes")
const AdminProfile = require("../routes/adminProfileRoutes")



chai.use(chaiHttp);

const expect = chai.expect;

describe("/", () => {
  it("admin add courses route", async () => {
    chai
      .request(Courses)
      .get("/admin/addCourses")
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
        
      });
  });
});

describe("/", () => {
  it("facilitator route", async () => {
    chai
      .request(Facilitator)
      .get("/admin/addFacilitator")
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
        
      });
  });
});

describe("/", () => {
  it("login route", async () => {
    chai
      .request(Login)
      .get("/login")
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
        
      });
  });
});

describe("/", () => {
  it("login route", async () => {
    chai
      .request(AdminProfile)
      .get("/admin/profile")
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
        
      });
  });
});



setTimeout(() => {
  process.exit();
}, 1000);
