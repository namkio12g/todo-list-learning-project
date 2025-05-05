import React from "react";
import "./TaskButton.scss";
interface TaskButtonProps {
    type: "delete-btn" | "done-btn" | "undone-btn";
    label: string;
    onClick: () => void;
}

const TaskButton: React.FC<TaskButtonProps> = ({ label, type, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`task-button ${type} font-semibold mr-2`}
        >
            {label}
        </button>
    );
};

export default TaskButton;
