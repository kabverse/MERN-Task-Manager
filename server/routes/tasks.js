const router = require("express").Router();
const Task = require("../models/task");

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

// Add a new task
router.post("/", async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json("Task deleted");
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

// Update a task
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.title = req.body.title;
        task.description = req.body.description;
        task.completed = req.body.completed;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

module.exports = router;
