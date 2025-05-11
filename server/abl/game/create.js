const Ajv = require("ajv");
const ajv = new Ajv();

const gameDao = require("../../dao/game.js");

const hole_score_schema = {
    type: "object",
    properties: {
        id: "number",
        strokes: "number",
    }
}

let schema = {
    type: "object",
    properties: {
        name: {type: "string"},
        score: {type: [hole_score_schema]},
    },
    required: ["name", "score"],
    additionalProperties: false,
};

async function CreateGame(req, res) {
    try {
        let game = req.body;
        const valid = ajv.validate(schema, game);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                game: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }
        try {
            game = gameDao.create(game);
        } catch (error) {
            res.status(400).json({
                ...error,
            });
            return;
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({game: error.game});
    }
}

module.exports = CreateGame;
