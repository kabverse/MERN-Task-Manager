const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/mern-app",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});

// Routes
const taskRouter = require("./routes/tasks");
app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
