import React from "react";

function TaskList({ tasks, onDelete, onToggle }) {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className={`task ${task.completed ? "completed" : ""}`}
                >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="task-actions">
                        <button onClick={() => onToggle(task)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => onDelete(task._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
