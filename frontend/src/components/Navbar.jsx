import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { useAuthentication } from "../auth";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
    const { isAuthorized, logout } = useAuthentication();
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const navigate = useNavigate(); // Навигация

    const handleLogout = () => {
        logout();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Обновляем запрос поиска
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Останавливаем перезагрузку страницы
        navigate(`/search?query=${searchQuery}`); // Перенаправляем на страницу с результатами поиска
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
                {/* Поисковая строка */}
                <li className="navbar-search">
                    <form onSubmit={handleSearchSubmit}> {/* Добавляем форму для сабмита */}
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
                    </form>
                </li>

                {/* Авторизация */}
                {isAuthorized ? (
                    <>
                        <li className="dashboard-icon">
                            <Link to="/dashboard">DB</Link>  {/* Исправлено: </link> на </Link> */}
                        </li>

                        <li>
                            <Link onClick={handleLogout} to="/logout" className="button-link">
                                Logout
                            </Link>
                        </li>
                    </>
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
