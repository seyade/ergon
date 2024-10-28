import { Router } from "express";
import { search } from "../controllers/serach.controller";

const router = Router();

router.get("/", search);

export default router;
