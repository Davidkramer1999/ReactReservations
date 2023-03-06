import React from 'react'
import { NavLink } from "react-router-dom";

import "./Css/NavigationBar.css"

export default function NavigationBar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-elements">
                    <ul>
                        <li>
                            <NavLink to="/SelectCurrencies">Currencies</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Accommodations">Choose accommodations</NavLink>
                        </li>
                        <li>
                            <NavLink to="/SelectedAccommodations"> Selected accommodations</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

