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
    project: {
        findMany: jest.fn(),
    },
}));
describe("GET /projects", () => {
    it("should return a list of projects", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/projects").expect(200);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it("should throw an error when fails to return projects list", () => __awaiter(void 0, void 0, void 0, function* () {
        client_1.default.project.findMany.mockRejectedValue(new Error("Error getting projects"));
        const response = yield (0, supertest_1.default)(app_1.default).get("/projects").expect(500);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Error getting projects" });
    }));
});
