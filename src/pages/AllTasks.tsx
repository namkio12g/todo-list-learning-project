import React, { useEffect, useMemo, useState } from "react";
import TaskCard from "../components/TaskCard/TaskCard";
import Modal from "../components/Modal/Modal";
import apiClient from "../api/TaskAPI";

export interface Task {
    id: string;
    taskType: string;
    taskName: string;
    isDone: boolean;
    time: {
        endTime: Date;
        startTime: Date;
    };
}

const AllTasksPage: React.FC = () => {
    const themes = ["blue-theme", "red-theme", "green-theme", "indigo-theme"];

    const [isModalOpen, setModalOpen] = useState(false);

    const [data, setData] = useState<Task[]>([]);

    useEffect(() => {
        const fetchUndoneTasks = async () => {
            const response = await fetch(
                "http://localhost:3001/tasks?isDone=false"
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

    const addNewTaskEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log(formData);

        if (
            formData.get("taskName") === "" ||
            formData.get("taskType") === "" ||
            formData.get("startTime") === "" ||
            formData.get("endTime") === ""
        ) {
            alert("missing fields");
            return;
        }
        const taskData = {
            taskType: formData.get("taskType") as string,
            taskName: formData.get("taskName") as string,
            isDone: false,
            time: {
                endTime: new Date(formData.get("endTime") as string),
                startTime: new Date(formData.get("startTime") as string),
            },
        };
        if (
            !taskData.time.endTime ||
            !taskData.time.startTime ||
            taskData.time.endTime < taskData.time.startTime
        ) {
            alert("Invalid time format");
            return;
        }
        console.log(taskData);
        await apiClient
            .post("/tasks", taskData)
            .then((response) => {
                alert("Task added successfully");
                setData((prevData) => [response.data, ...prevData]);
            })
            .catch((error) => {
                console.log(error);
            });
        setModalOpen(false);
    };

    const deleteTask = async (taskId: string) => {
        console.log(taskId);
        await apiClient.delete(`/tasks/${taskId}`);
        setData((prevData) => prevData.filter((task) => task.id !== taskId));
    };

    const doneTask = async (taskId: string) => {
        await apiClient.patch(`/tasks/${taskId}`, {
            isDone: true,
        });
        setData((prevData) => prevData.filter((task) => task.id !== taskId));
    };
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
            >
                <form
                    className="task-form flex flex-col gap-4 w-96"
                    onSubmit={addNewTaskEvent}
                >
                    <div>
                        <label
                            htmlFor="taskName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Task Name
                        </label>
                        <input
                            type="text"
                            id="taskName"
                            name="taskName"
                            required
                            className="peer px-2 py-2 mt-1 block w-full rounded-md ring-[1px] ring-indigo-100 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-indigo-300 sm:text-sm"
                            placeholder="Enter task name"
                        />
                        {/* <p className="block peer-required:block peer-placeholder-shown:hidden font-mono mt-2 ml-2 text-sm text-rose-600">
                            Missing Task Name
                        </p> */}
                    </div>
                    <div>
                        <label
                            htmlFor="taskType"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Task Type
                        </label>
                        <input
                            type="text"
                            id="taskType"
                            name="taskType"
                            required
                            className=" px-2 py-2 mt-1 block w-full rounded-md ring-[1px] ring-indigo-100 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-indigo-300 sm:text-sm"
                            placeholder="Enter task type"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="startTime"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Start Time
                        </label>
                        <input
                            type="date"
                            id="startTime"
                            name="startTime"
                            required
                            className=" px-2 py-2 mt-1 block w-full rounded-md ring-[1px] ring-indigo-100 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-indigo-300 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="endTime"
                            className="block text-sm font-medium text-gray-700"
                        >
                            End Time
                        </label>
                        <input
                            type="date"
                            id="endTime"
                            name="endTime"
                            required
                            className=" px-2 py-2 mt-1 block w-full rounded-md ring-[1px] ring-indigo-100 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-indigo-300 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Add Task
                    </button>
                </form>
            </Modal>

            <div className="all-tasks-container place-items-center">
                <div className="container-title text-3xl text-indigo-900 font-semibold font-comic mb-5 ">
                    All tasks are needed to be completed.
                </div>
                <button
                    className="bg-indigo-800 my-4 px-10 py-3 text-white rounded-lg font-semibold hover:bg-indigo-700 hover:text-white hover:shadow-lg shadow-md"
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    Add a new task
                </button>

                <div className="w-7/12 h-96 overflow-y-scroll ">
                    {tasks.map((task) => {
                        return (
                            <TaskCard
                                isDone={false}
                                taskName={task.taskName}
                                taskType={task.taskType}
                                theme={task.theme}
                                time={task.time}
                                onDelete={() => deleteTask(task.id)}
                                onToggle={() => doneTask(task.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default AllTasksPage;
