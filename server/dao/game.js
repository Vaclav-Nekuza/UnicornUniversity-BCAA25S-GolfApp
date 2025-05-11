const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const game_dir_path = path.join(
    __dirname,
    "storage",
    "game_list"
);

function get(game_id) {
    try {
        const file_path = path.join(game_dir_path, `${game_id}.json`);
        const file_data = fs.readFileSync(file_path, "utf8");
        return JSON.parse(file_data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return null;
        }
        throw { code: "failedToFindGame", message: error.message };
    }
}

function create(game) {
    try {
        game.id = crypto.randomBytes(16).toString("hex");
        const file_path = path.join(game_dir_path, `${game.id}.json`);
        const file_data = JSON.stringify(game);
        fs.writeFileSync(file_path, file_data, "utf8");
        return game;
    } catch (error) {
        throw { code: "failedToCreateGame", message: error.message };
    }
}

function update(game) {
    try {
        const cur_game = get(game.id);
        if (!cur_game) return null;
        const new_game = { ...cur_game, ...game };
        const file_path = path.join(game_dir_path, `${game.id}.json`);
        const file_data = JSON.stringify(new_game);
        fs.writeFileSync(file_path, file_data, "utf8");
        return new_game;
    } catch (error) {
        throw { code: "failedToUpdateGame", message: error.message };
    }
}

function remove(game_id) {
    try {
        const file_path = path.join(game_dir_path, `${game_id}.json`);
        fs.unlinkSync(file_path);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") return {};
        throw { code: "failedToRemoveGame", message: error.message };
    }
}

function list() {
    try {
        const files = fs.readdirSync(game_dir_path);
        let game_list = files.map((file) => {
            const file_data = fs.readFileSync(
                path.join(game_dir_path, file),
                "utf8"
            );
            return JSON.parse(file_data);
        });
        game_list.sort();
        return game_list;
    } catch (error) {
        throw { code: "failedToListGames", message: error.message };
    }
}


module.exports = {
    get,
    create,
    update,
    remove,
    list,
};