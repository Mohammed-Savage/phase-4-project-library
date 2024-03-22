import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
    return (
        <nav className="navbar">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/members">Members</NavLink>
        </nav>
    );
};

