const chai = require("chai");
const chaiHttp = require("chai-http");
const AdminAddCourses = require("../routes/adminAddCoursesRoutes");
const Login = require("../routes/loginRoutes");
const Facilitator = require("../routes/facilitatorRoutes");
const AdminProfile = require("../routes/adminProfileRoutes");
const AdminAddCourseMaterial = require("../routes/adminAddCourseMaterialRoutes")

chai.use(chaiHttp);

const expect = chai.expect;

describe("/", () => {
  it("admin add courses route", async () => {
    chai
      .request(AdminAddCourses)
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

describe("authication", () => {
  it("login route", async () => {
    chai
      .request(Login)
      .post("/login")
      .send({username:'karl',password:'password' })
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
      });
  });
});

describe("CourseModule", () => {
  it("get", async () => {
    chai
      .request(Login)
      .get("/login")
      .send({username:'karl',password:'password' })
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
      });
  });
});

describe("/", () => {
  it("Admin Profile", async () => {
    chai
      .request(AdminProfile)
      .get("/admin/profile")
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
      });
  });
});

describe("/", () => {
  it("Admin Add Course Material", async () => {
    chai
      .request(AdminAddCourseMaterial)
      .get("/admin/addCourseMaterial")
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
      });
  });
});

setTimeout(() => {
  process.exit();
}, 1000);
