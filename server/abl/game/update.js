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
        id: {type: "number"},
        name: {type: "string"},
        score: {type: [hole_score_schema]},
    },
    required: ["id", "score"],
    additionalProperties: false,
};
async function UpdateGame(req, res) {
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
        let updated_game;
        try {
            updated_game = gameDao.update(game);
        } catch (e) {
            res.status(400).json({
                ...e,
            });
            return;
        }
        if (!updated_game) {
            res.status(404).json({
                code: "gameNotFound",
                game: `game with id ${game.id} not found`,
            });
            return;
        }
        res.json(updated_game);
    } catch (error) {
        res.status(500).json({ game: error.game });
    }
}

module.exports = UpdateGame;
