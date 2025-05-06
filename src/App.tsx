import React from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import CompletedTasksPage from "./pages/CompletedTasks";
import AllTasksPage from "./pages/AllTasks";
import NavBar from "./containers/NavBar/NavBar";
import "./App.css";

function App() {
    const UseNavBar = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className="root-container relative w-full min-h-screen h-full bg-gray-200 p-4 place-items-center">
                <NavBar />
                <div className="content-container py-12 w-full">{children}</div>
            </div>
        );
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/completed-tasks"
                        element={
                            <UseNavBar>
                                <CompletedTasksPage />
                            </UseNavBar>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <UseNavBar>
                                <AllTasksPage />
                            </UseNavBar>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
