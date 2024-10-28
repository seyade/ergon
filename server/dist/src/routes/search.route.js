"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serach_controller_1 = require("../controllers/serach.controller");
const router = (0, express_1.Router)();
router.get("/", serach_controller_1.search);
exports.default = router;
