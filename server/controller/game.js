const express = require("express");
const router = express.Router();

const GetGame = require("../abl/game/get");
const ListGame = require("../abl/game/list");
const CreateGame = require("../abl/game/create");
const UpdateGame = require("../abl/game/update");
const DeleteGame = require("../abl/game/delete");

router.get("/get", GetGame);
router.get("/list", ListGame);
router.post("/create", CreateGame);
router.post("/update", UpdateGame);
router.post("/delete", DeleteGame);

module.exports = router;