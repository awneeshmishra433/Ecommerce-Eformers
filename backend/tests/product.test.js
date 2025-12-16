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
  process.env.MONGODB_URI = uri;
  process.env.JWT_SECRET = "testsecret";
  process.env.ADMIN_EMAIL = "admin@example.com";
  process.env.ADMIN_PASSWORD = "adminpass";
  await connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Product API", () => {
  it("lists products (initially empty)", async () => {
    const res = await request(app).get("/api/product/list");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products.length).toBe(0);
  });

  it("allows admin to add a product without images", async () => {
    // Login as admin to get token
    const login = await request(app).post("/api/user/admin").send({
      email: "admin@example.com",
      password: "adminpass",
    });
    const token = login.body.token;

    const product = {
      name: "Test Product",
      description: "Some description",
      price: 99.99,
      category: "Seeds",
      sizes: JSON.stringify(["S", "M"]),
      bestseller: "false",
    };

    const res = await request(app)
      .post("/api/product/add")
      .set("token", token)
      .field("name", product.name)
      .field("description", product.description)
      .field("price", product.price)
      .field("category", product.category)
      .field("sizes", product.sizes)
      .field("bestseller", product.bestseller);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("lists products after adding one", async () => {
    const res = await request(app).get("/api/product/list");
    expect(res.status).toBe(200);
    expect(res.body.products.length).toBe(1);
  });
});
