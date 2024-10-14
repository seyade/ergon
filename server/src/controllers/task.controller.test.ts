import request from "supertest";
import app from "../app";
import prisma from "../../prisma/client";

jest.mock("../../prisma/client", () => ({
  __esModule: true,
  default: {
    task: {
      findMany: jest.fn(),
    },
  },
}));

describe("GET /tasks", () => {
  const mockedTasksData = [
    {
      id: 42,
      title: "Task One",
      description: "Task One",
      status: "To Do",
      priority: "High",
      tags: "Deployment",
      startDate: null,
      dueDate: null,
      points: null,
      projectId: 11,
      authorUserId: 1,
      assignedUserId: 2,
    },
    {
      id: 43,
      title: "Task Two",
      description: "Task Two",
      status: "Work In Progress",
      priority: "High",
      tags: "Deployment",
      startDate: null,
      dueDate: null,
      points: null,
      projectId: 11,
      authorUserId: 1,
      assignedUserId: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of tasks related to a project", async () => {
    (prisma as any).task.findMany.mockResolvedValue(mockedTasksData);

    const projectId = 11;
    const response = await request(app).get(`/tasks?projectId=${projectId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should throw an error when it fails to return task list", async () => {
    const projectId = 11;
    const MOCK_SERVER_ERR_MESSAGE = "Some server error";
    (prisma as any).task.findMany.mockRejectedValue(
      new Error(MOCK_SERVER_ERR_MESSAGE)
    );
    const response = await request(app)
      .get(`/tasks?projectId=${projectId}`)
      .expect(500);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error getting tasks list: ${MOCK_SERVER_ERR_MESSAGE}`,
    });
  });
});
