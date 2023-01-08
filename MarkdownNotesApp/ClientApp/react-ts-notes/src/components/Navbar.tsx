import { NavLink } from "react-router-dom";
import NoteAltTwoToneIcon from '@mui/icons-material/NoteAltTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { ThemeContext } from "../context/themeContext";
import React from "react";
import { ThemeContextType } from "../@types/theme";


export function Navbar() {

    const { theme, toggleTheme } = React.useContext(ThemeContext) as ThemeContextType;

    return (
        <div className="custom-navbar">
            <ul className="custom-navbar-nav">
                <li className="logo">
                    <a href="#" className="custom-nav-link">
                        <KeyboardDoubleArrowRightIcon />
                        <span className="custom-link-text logo-text">TsNotes</span>
                    </a>
                </li>
                <li className="custom-nav-item">
                    <NavLink to="/" className="custom-nav-link">
                        <DescriptionTwoToneIcon />
                        <span className="custom-link-text">Notes</span>
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink to="/new" className="custom-nav-link">
                        <NoteAltTwoToneIcon />
                        <span className="custom-link-text">NewNote</span>
                    </NavLink>
                </li>
                {theme === "dark" &&
                    <li className="custom-nav-item color-mode-icon" onClick={toggleTheme}>
                        {/* sx={{ color: pink[500], fontSize: 40 }} */}
                        <a href="#" className="custom-nav-link">
                            <LightModeTwoToneIcon />
                            <span className="custom-link-text">Lightmode</span>
                        </a>
                    </li>}
                {theme === "light" &&
                    <li className="custom-nav-item color-mode-icon" onClick={toggleTheme}>
                        <a href="#" className="custom-nav-link">
                            <DarkModeTwoToneIcon />
                            <span className="custom-link-text">Darkmode</span>
                        </a>
                    </li>}
            </ul>
        </div>
    );

}