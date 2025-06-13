import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import { createCourse } from "../controllers/course.controller";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);

export default router;