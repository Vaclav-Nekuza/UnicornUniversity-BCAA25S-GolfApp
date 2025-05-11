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

    async function CreateCourse(req, res) {
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
            try {
                course = courseDao.create(course);
            } catch (error) {
                res.status(400).json({
                    ...error,
                });
                return;
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({course: error.course});
        }
    }

    module.exports = CreateCourse;
