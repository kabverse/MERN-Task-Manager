import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API_URL + "/api/tasks"
            );
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/api/tasks",
                task
            );
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(
                process.env.REACT_APP_API_URL + `/api/tasks/${id}`
            );
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleComplete = async (task) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_API_URL + `/api/tasks/${task._id}`,
                {
                    ...task,
                    completed: !task.completed,
                }
            );
            setTasks(
                tasks.map((t) => (t._id === task._id ? response.data : t))
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="App">
            <h1>MERN Task Manager</h1>
            <TaskForm onAdd={addTask} />
            <TaskList
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleComplete}
            />
        </div>
    );
}

export default App;
