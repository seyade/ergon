"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const client_1 = __importDefault(require("../../prisma/client"));
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
    it("should return a list of tasks related to a project", () => __awaiter(void 0, void 0, void 0, function* () {
        client_1.default.task.findMany.mockResolvedValue(mockedTasksData);
        const projectId = 11;
        const response = yield (0, supertest_1.default)(app_1.default).get(`/tasks?projectId=${projectId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it("should throw an error when it fails to return task list", () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 11;
        const MOCK_SERVER_ERR_MESSAGE = "Some server error";
        client_1.default.task.findMany.mockRejectedValue(new Error(MOCK_SERVER_ERR_MESSAGE));
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/tasks?projectId=${projectId}`)
            .expect(500);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Error getting tasks list: ${MOCK_SERVER_ERR_MESSAGE}`,
        });
    }));
});
