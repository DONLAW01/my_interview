const request = require("supertest");
const app = require("../../backend/server");

describe("Todos API", () => {
  const validToken = "Bearer fake-jwt-token";
  const invalidToken = "Bearer invalid-token";

  describe("GET /items", () => {
    it("should get all todos with valid token", async () => {
      const response = await request(app)
        .get("/items")
        .set("Authorization", validToken)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("text");
      expect(response.body[0]).toHaveProperty("completed");
    });

    it("should reject request without token", async () => {
      await request(app).get("/items").expect(401);
    });

    it("should reject request with invalid token", async () => {
      await request(app)
        .get("/items")
        .set("Authorization", invalidToken)
        .expect(401);
    });
  });

  describe("POST /items", () => {
    it("should create a new todo with valid data", async () => {
      const todoData = { text: "Test Todo" };

      const response = await request(app)
        .post("/items")
        .set("Authorization", validToken)
        .send(todoData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("text", "Test Todo");
      expect(response.body).toHaveProperty("completed", false);
    });

    it("should reject todo creation without text", async () => {
      const response = await request(app)
        .post("/items")
        .set("Authorization", validToken)
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty("message", "Text required");
    });

    it("should reject todo creation without token", async () => {
      await request(app).post("/items").send({ text: "Test Todo" }).expect(401);
    });
  });

  describe("PUT /items/:id", () => {
    it("should update an existing todo", async () => {
      const updateData = { text: "Updated Todo", completed: true };

      const response = await request(app)
        .put("/items/1")
        .set("Authorization", validToken)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("text", "Updated Todo");
      expect(response.body).toHaveProperty("completed", true);
    });

    it("should reject update of non-existent todo", async () => {
      await request(app)
        .put("/items/999")
        .set("Authorization", validToken)
        .send({ text: "Updated Todo" })
        .expect(404);
    });

    it("should reject update without token", async () => {
      await request(app)
        .put("/items/1")
        .send({ text: "Updated Todo" })
        .expect(401);
    });
  });

  describe("DELETE /items/:id", () => {
    it("should delete an existing todo", async () => {
      await request(app)
        .delete("/items/1")
        .set("Authorization", validToken)
        .expect(204);
    });

    it("should reject deletion of non-existent todo", async () => {
      await request(app)
        .delete("/items/999")
        .set("Authorization", validToken)
        .expect(404);
    });

    it("should reject deletion without token", async () => {
      await request(app).delete("/items/1").expect(401);
    });
  });
});
