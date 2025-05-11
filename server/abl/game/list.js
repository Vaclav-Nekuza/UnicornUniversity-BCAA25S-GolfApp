const gameDao = require("../../dao/game.js");

async function ListGame(req, res) {
    try {
        const gameList = gameDao.list();
        res.json({ itemList: gameList });
    } catch (error) {
        res.status(500).json({ game: error.game });
    }
}

module.exports = ListGame;
