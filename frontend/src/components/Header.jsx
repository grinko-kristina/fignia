import React from "react";
import "../styles/Header.css";
import bgwoman from "../assets/bg-woman.png";


const Header = () => {
    return (
        <header className="header">
            <img src={bgwoman} alt="Background woman" className="header-bg" />
            <div className="header-content">
                <h1>BookWise</h1>
                <h3>Owl'll advise!</h3>

            </div>

        </header>
    )
}

export default Header;