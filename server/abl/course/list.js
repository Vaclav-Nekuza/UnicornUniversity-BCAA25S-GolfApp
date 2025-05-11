const courseDao = require("../../dao/course.js");

async function ListCourse(req, res) {
    try {
        const courseList = courseDao.list();
        res.json({ itemList: courseList });
    } catch (error) {
        res.status(500).json({ course: error.course });
    }
}

module.exports = ListCourse;
