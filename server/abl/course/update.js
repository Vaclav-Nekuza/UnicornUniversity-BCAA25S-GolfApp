const Ajv = require("ajv");
const ajv = new Ajv();

const courseDao = require("../../dao/course.js");

const hole_schema = {
    type: "object",
    properties: {
        id: "number",
        par: "number",
        hcp: "number",
        length: "number",
    }
}

let schema = {
    type: "object",
    properties: {
        name: {type: "string"},
        number_of_holes: {type: "number"},
        holes: {type: [hole_schema]},
    },
    required: ["name", "number_of_holes", "holes"],
    additionalProperties: false,
};

async function UpdateCourse(req, res) {
    try {
        let course = req.body;
        const valid = ajv.validate(schema, course);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                course: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }
        let updated_course;
        try {
            updated_course = courseDao.update(course);
        } catch (e) {
            res.status(400).json({
                ...e,
            });
            return;
        }
        if (!updated_course) {
            res.status(404).json({
                code: "courseNotFound",
                course: `course with id ${course.id} not found`,
            });
            return;
        }
        res.json(updated_course);
    } catch (error) {
        res.status(500).json({ course: error.course });
    }
}

module.exports = UpdateCourse;
