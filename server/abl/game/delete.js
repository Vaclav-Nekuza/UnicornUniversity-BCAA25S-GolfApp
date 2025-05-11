const Ajv = require("ajv");
const ajv = new Ajv();
const gameDao = require("../../dao/game.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function DeleteGame(req, res) {
    try {
        const reqParams = req.body;
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                game: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }
        gameDao.remove(reqParams.id);
        res.json({});
    } catch (error) {
        res.status(500).json({ game: error.game });
    }
}

module.exports = DeleteGame;
