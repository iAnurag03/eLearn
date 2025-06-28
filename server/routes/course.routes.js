import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse).get(isAuthenticated,getCreatorCourses);

router.route("/search").get(isAuthenticated,searchCourse);
// Specific routes should come before dynamic routes
router.route("/published-courses").get( getPublishedCourse);

router.route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse)
  .get(isAuthenticated, getCourseById)
  .patch(isAuthenticated, togglePublishCourse);

router.route("/:courseId/lecture").post(isAuthenticated,createLecture);
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);

export default router;