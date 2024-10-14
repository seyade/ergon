import request from "supertest";
import app from "../app";
import prisma from "../../prisma/client";

jest.mock("../../prisma/client", () => ({
  project: {
    findMany: jest.fn(),
  },
}));

describe("GET /tasks", () => {
  it("should return a list of tasks related to a project", async () => {
    const projectId = 11;
    const response = await request(app)
      .get(`/tasks?projectId=${projectId}`)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it.skip("should throw an error when it fails to return task list", async () => {
    (prisma.project.findMany as jest.Mock)
      .mockImplementation()
      .mockRejectedValue(new Error("Error getting tasks list"));
    const response = await request(app).get("/tasks").expect(500);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Error getting tasks lists" });
  });
});
