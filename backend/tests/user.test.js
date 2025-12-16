import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDB from "../config/mangodb.js";
import { app } from "../server.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri().replace(/\/$/, "");
  process.env.MONGODB_URI = uri; // connectDB will append /ecommerce
  process.env.JWT_SECRET = "testsecret";
  process.env.ADMIN_EMAIL = "admin@example.com";
  process.env.ADMIN_PASSWORD = "adminpass";
  await connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User API", () => {
  it("registers a user and returns token", async () => {
    const res = await request(app).post("/api/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeTruthy();
  });

  it("logs in an existing user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeTruthy();
  });

  it("changes password with valid current password", async () => {
    const res = await request(app).post("/api/user/forgot").send({
      email: "test@example.com",
      password: "password123",
      reenterpassword: "newpassword123",
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("allows admin login with correct credentials", async () => {
    const res = await request(app).post("/api/user/admin").send({
      email: "admin@example.com",
      password: "adminpass",
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeTruthy();
  });
});
