const Ajv = require("ajv");
const ajv = new Ajv();
const courseDao = require("../../dao/course.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function GetCourse(req, res) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                course: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }
        const course = courseDao.get(reqParams.id);
        if (!course) {
            res.status(404).json({
                code: "courseNotFound",
                course: `course with id ${reqParams.id} not found`,
            });
            return;
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ course: error.course });
    }
}

module.exports = GetCourse;
