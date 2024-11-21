import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { useAuthentication } from "../auth";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchBooks from './SearchBooks';

function Navbar() {
    const { isAuthorized, logout } = useAuthentication();
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    const handleLogout = () => {
        logout();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query
    };

    return (
        <div className="navbar">
            <Link to="/" className="navbar-logo-link">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </Link>
            <ul className="navbar-menu-left">
                {/* Add other navbar items if needed */}
            </ul>
            <ul className="navbar-menu-right">
                {/* Search Bar */}
                <li className="navbar-search">
                    <TextField
                        variant="outlined"
                        placeholder="Search for books or authors..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        className="navbar-search-field"
                    />
                    {/* Render SearchBooks with searchQuery */}
                    <SearchBooks query={searchQuery} />
                </li>

                {/* Authorization Links */}
                {isAuthorized ? (
                    <li>
                        <Link onClick={handleLogout} to="/logout" className="button-link">
                            Logout
                        </Link>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="button-link-login">
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="button-link">
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
