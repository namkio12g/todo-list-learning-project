import React from "react";
import TaskButton from "../TaskButton/TaskButton";
import "./TaskCard.scss";

interface TaskProps {
    isDone: boolean;
    taskName: string;
    taskType: string;
    theme: string;
    time: {
        endTime: Date;
        startTime: Date;
    };
    onDelete: () => void;
    onToggle: () => void;
}

const TaskCard: React.FC<TaskProps> = ({
    taskName,
    isDone,
    taskType,
    theme,
    time,
    onDelete,
    onToggle,
}) => {
    return (
        <div
            className={`task-card ${theme} flex h-28 rounded-2xl overflow-hidden border-2 mb-5`}
        >
            <div className="task-card-header flex flex-col justify-between    h-full w-[150px] px-3 py-3 place-items-center">
                <div className="task-times place-items-center ">
                    <p className="text-sm text-white">
                        {new Date(time.startTime).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-sm text-white">
                        - {new Date(time.endTime).toLocaleDateString("en-GB")}
                    </p>
                </div>
                <div className="task-done w-full">
                    {!isDone ? (
                        <p className="task-done-title text-orange-500  bg-white mt-2  rounded-lg text-md font-semibold border-0 text-center">
                            In progress
                        </p>
                    ) : (
                        <p className="task-done-title text-green-700  bg-white mt-2  rounded-lg text-md font-semibold border-0 text-center">
                            Completed
                        </p>
                    )}
                </div>
            </div>
            <div className="task-card-body flex flex-col w-full justify-between h-full px-3 py-3">
                <div className="task-name overflow-y-scroll h-9/12 xl:h-1/12">
                    <p>{taskName}</p>
                </div>
                <div className="task-bottom flex justify-between place-content-end ">
                    <div className="task-type flex">
                        <p className="mr-2 font-semibold">Task type : </p>
                        <p>{taskType}</p>
                    </div>
                    <div className="task-buttons place-content-start h-100 mr-10">
                        {isDone ? (
                            <TaskButton
                                type="undone-btn"
                                label="Undone"
                                onClick={onToggle}
                            />
                        ) : (
                            <TaskButton
                                type="done-btn"
                                label="Done"
                                onClick={onToggle}
                            />
                        )}
                        <TaskButton
                            type="delete-btn"
                            label="Delete"
                            onClick={onDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
