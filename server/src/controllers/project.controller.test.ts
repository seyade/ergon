import request from "supertest";
import app from "../app";
import prisma from "../../prisma/client";
import { debug } from "console";

jest.mock("../../prisma/client", () => ({
  project: {
    findMany: jest.fn(),
  },
}));

describe("GET /projects", () => {
  it("should return a list of projects", async () => {
    const response = await request(app).get("/projects").expect(200);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it.skip("should throw an error when fails to return projects list", async () => {
    (prisma.project.findMany as jest.Mock)
      .mockImplementation()
      .mockRejectedValue(new Error("Error getting projects"));
    const response = await request(app).get("/projects").expect(500);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Error getting projects" });
  });
});
