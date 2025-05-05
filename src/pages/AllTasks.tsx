import React, { useMemo } from "react";
import TaskCard from "../components/TaskCard/TaskCard";
import Modal from "../components/Modal/Modal";

const AllTasksPage: React.FC = () => {
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
        <>
            <Modal isOpen={true} onClose={() => {}}>
                <div>hello</div>
            </Modal>
            <div className="all-tasks-container place-items-center">
                <div className="container-title text-3xl text-indigo-900 font-semibold font-comic mb-5 ">
                    All tasks are needed to be completed.
                </div>
                <button className="bg-indigo-800 my-4 px-10 py-3 text-white rounded-lg font-semibold hover:bg-indigo-700 hover:text-white hover:shadow-lg shadow-md">
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
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default AllTasksPage;
