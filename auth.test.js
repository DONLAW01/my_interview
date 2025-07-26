const request = require("supertest");
const app = require("../../backend/server");

describe("Authentication API", () => {
  describe("POST /login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "admin",
          password: "password",
        })
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("token", "fake-jwt-token");
      expect(response.body).toHaveProperty("username", "admin");
    });

    it("should reject invalid username", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "invalid",
          password: "password",
        })
        .expect(401);

      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should reject invalid password", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "admin",
          password: "wrongpassword",
        })
        .expect(401);

      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should reject missing credentials", async () => {
      const response = await request(app).post("/login").send({}).expect(401);

      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should reject malformed request", async () => {
      await request(app).post("/login").send("invalid json").expect(500);
    });
  });
});
