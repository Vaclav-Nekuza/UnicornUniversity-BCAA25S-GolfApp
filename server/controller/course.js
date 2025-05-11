const express = require("express");
const router = express.Router();

const GetCourse = require("../abl/course/get");
const ListCourse = require("../abl/course/list");
const CreateCourse = require("../abl/course/create");
const UpdateCourse = require("../abl/course/update");
const DeleteCourse = require("../abl/course/delete");

router.get("/get", GetCourse);
router.get("/list", ListCourse);
router.post("/create", CreateCourse);
router.post("/update", UpdateCourse);
router.post("/delete", DeleteCourse);

module.exports = router;