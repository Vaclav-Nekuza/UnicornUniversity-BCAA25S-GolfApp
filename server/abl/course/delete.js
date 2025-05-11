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

async function DeleteCourse(req, res) {
    try {
        const reqParams = req.body;
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                course: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }
        courseDao.remove(reqParams.id);
        res.json({});
    } catch (error) {
        res.status(500).json({ course: error.course });
    }
}

module.exports = DeleteCourse;
