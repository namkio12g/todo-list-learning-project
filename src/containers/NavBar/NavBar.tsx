import React from "react";
import StickyNode from "../../assets/sticky-note.png";
import { Link } from "react-router";
import "./NavBar.scss";

const NavBar: React.FC = () => {
    return (
        <nav className="navbar h-20 w-10/12 bg-white rounded-xl shadow-lg place-content-center px-5">
            <div className="inline-block">
                <img
                    src={StickyNode}
                    alt=""
                    className="h-12 w-12 inline-block mr-3"
                />
                <Link
                    to="/"
                    className="navbar-title inline-block mr-10 font-serif text-xl font-bold text-blue-text"
                >
                    Todo List
                </Link>
            </div>
            <ul className="navbar-links inline-block">
                <li className="link inline-block mr-7 text-lg">
                    <Link to="/">All Tasks</Link>
                </li>
                <li className="link inline-block mr-7 text-lg ">
                    <Link to="/completed-tasks">Completed Tasks</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
