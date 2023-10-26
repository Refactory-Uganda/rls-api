const chai = require("chai");
const chaiHttp = require("chai-http");
const AdminAddCourses = require("../routes/coursesRoutes");
const Login = require("../routes/loginRoutes");
const Facilitator = require("../routes/facilitatorRoutes");
const AdminProfile = require("../routes/adminProfileRoutes");
const AdminAddCourseMaterial = require("../routes/courseMaterialRoutes")
const courseModule = require('../routes/courseModuleRoutes')
chai.use(chaiHttp);

const expect = chai.expect;

describe("/", () => {
  it("admin add courses route", async () => {
    chai
      .request(AdminAddCourses)
      .get("/courses")
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
      .get("/facilitator")
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
describe("Course Modules", () => {
  it("post course modules", async () => {
    chai
      .request(courseModule)
      .get("/coursemodule")
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
      .get("/courseMaterial")
      .end((err, res) => {
        expect(res.json).to.have.status(200);
        expect(res.text).to.equal("Hello, Express!");
      });
  });
});

setTimeout(() => {
  process.exit();
}, 1000);
