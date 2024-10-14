import request from "supertest";
import app from "../app";

jest.mock("../config/prismaClient", () => ({
  __esModule: true,
  default: {
    project: {
      findMany: jest.fn(),
    },
  },
}));

import prisma from "../config/prismaClient";

describe("GET /projects", () => {
  const mockedProjectsData = [
    {
      id: 1,
      name: "Project One",
      description: "Description one",
      startDate: null,
      endDate: null,
    },
    {
      id: 2,
      name: "Project Two",
      description: "Description two",
      startDate: null,
      endDate: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of projects", async () => {
    (prisma as any).project.findMany.mockResolvedValue(mockedProjectsData);

    const response = await request(app).get("/projects");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedProjectsData);
    expect(response.body).toBeInstanceOf(Array);
    expect((prisma as any).project.findMany).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when fails to return projects list", async () => {
    const MOCK_SERVER_ERR_MESSAGE = "Some server error";
    (prisma as any).project.findMany.mockRejectedValue(
      new Error(MOCK_SERVER_ERR_MESSAGE)
    );
    const response = await request(app).get("/projects").expect(500);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error getting projects: ${MOCK_SERVER_ERR_MESSAGE}`,
    });
  });
});
