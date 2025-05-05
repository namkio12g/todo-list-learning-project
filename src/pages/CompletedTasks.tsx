import React, { useMemo } from "react";
import TaskCard from "../components/TaskCard/TaskCard";

const CompletedTasksPage: React.FC = () => {
    const themes = ["blue-theme", "red-theme", "green-theme", "indigo-theme"];
    const data = [
        { taskType: "Task 1", taskName: "Description for Task 1" },
        { taskType: "Task 2", taskName: "Description for Task 2" },
        { taskType: "Task 3", taskName: "Description for Task 3" },
        { taskType: "Task 3", taskName: "Description for Task 3" },
        { taskType: "Task 3", taskName: "Description for Task 3" },
        { taskType: "Task 3", taskName: "Description for Task 3" },
    ];
    const tasks = useMemo(() => {
        return data.map((task) => {
            const theme = themes[Math.floor(Math.random() * themes.length)];

            return { ...task, theme };
        });
    }, [data]);

    return (
        <div className="all-tasks-container place-items-center">
            <div className="container-title text-3xl text-emerald-800 font-semibold font-comic mb-5 ">
                All tasks are done here.
            </div>
            <div className="w-7/12 h-96 overflow-y-scroll  ">
                {tasks.map((task) => {
                    return (
                        <TaskCard
                            isDone={true}
                            taskName={task.taskName}
                            taskType={task.taskType}
                            theme={task.theme}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CompletedTasksPage;
