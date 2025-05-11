const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const course_dir_path = path.join(
    __dirname,
    "storage",
    "course_list"
);

function get(course_id) {
    try {
        const file_path = path.join(course_dir_path, `${course_id}.json`);
        const file_data = fs.readFileSync(file_path, "utf8");
        return JSON.parse(file_data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return null;
        }
        throw { code: "failedToFindCourse", message: error.message };
    }
}

function create(course) {
    try {
        course.id = crypto.randomBytes(16).toString("hex");
        const file_path = path.join(course_dir_path, `${course.id}.json`);
        const file_data = JSON.stringify(course);
        fs.writeFileSync(file_path, file_data, "utf8");
        return course;
    } catch (error) {
        throw { code: "failedToCreateCourse", message: error.message };
    }
}

function update(course) {
    try {
        const cur_course = get(course.id);
        if (!cur_course) return null;
        const new_course = { ...cur_course, ...course };
        const file_path = path.join(course_dir_path, `${course.id}.json`);
        const file_data = JSON.stringify(new_course);
        fs.writeFileSync(file_path, file_data, "utf8");
        return new_course;
    } catch (error) {
        throw { code: "failedToUpdateCourse", message: error.message };
    }
}

function remove(course_id) {
    try {
        const file_path = path.join(course_dir_path, `${course_id}.json`);
        fs.unlinkSync(file_path);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") return {};
        throw { code: "failedToRemoveCourse", message: error.message };
    }
}

function list() {
    try {
        const files = fs.readdirSync(course_dir_path);
        let course_list = files.map((file) => {
            const file_data = fs.readFileSync(
                path.join(course_dir_path, file),
                "utf8"
            );
            return JSON.parse(file_data);
        });
        course_list.sort();
        return course_list;
    } catch (error) {
        throw { code: "failedToListCourses", message: error.message };
    }
}


module.exports = {
    get,
    create,
    update,
    remove,
    list,
};