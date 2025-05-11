const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const CourseController = require("./server/controller/course");
const GameController = require("./server/controller/game");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use("/course", CourseController);
app.use("/game", GameController);

app.listen(PORT, () => {
    console.log(`Golf API server is running on port ${PORT}`);
});
