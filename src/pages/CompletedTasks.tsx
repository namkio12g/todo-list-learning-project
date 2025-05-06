import React, { useEffect, useMemo, useState } from "react";
import TaskCard from "../components/TaskCard/TaskCard";
import { Task } from "./AllTasks";
import apiClient from "../api/TaskAPI";

const CompletedTasksPage: React.FC = () => {
    const themes = ["blue-theme", "red-theme", "green-theme", "indigo-theme"];
    const [data, setData] = useState<Task[]>([]);

    useEffect(() => {
        const fetchUndoneTasks = async () => {
            const response = await fetch(
                "http://localhost:3001/tasks?isDone=true"
            );
            response
                .json()
                .then((tasks) => {
                    console.log(tasks);
                    setData(tasks);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchUndoneTasks();
        return;
    }, []);

    const tasks = useMemo(() => {
        return data.map((task) => {
            const theme = themes[Math.floor(Math.random() * themes.length)];

            return { ...task, theme };
        });
    }, [data]);

    const deleteTask = async (taskId: string) => {
        console.log(taskId);
        await apiClient.delete(`/tasks/${taskId}`);
        setData((prevData) => prevData.filter((task) => task.id !== taskId));
    };

    const undoneTask = async (taskId: string) => {
        await apiClient.patch(`/tasks/${taskId}`, {
            isDone: false,
        });
        setData((prevData) => prevData.filter((task) => task.id !== taskId));
    };
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
                            time={task.time}
                            onDelete={() => deleteTask(task.id)}
                            onToggle={() => undoneTask(task.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CompletedTasksPage;
