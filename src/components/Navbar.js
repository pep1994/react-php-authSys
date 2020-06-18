import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand" to="/" activeStyle={{ color: "white", fontWeight: "bold" }}>Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink  to="/" activeStyle={{ color: "white", fontWeight: "bold" }}>Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-Link" to="/login" activeStyle={{ color: "white", fontWeight: "bold" }}>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-Link" to="/signin" activeStyle={{ color: "white", fontWeight: "bold" }}>Sign In</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
