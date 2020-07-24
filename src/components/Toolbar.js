import React from 'react'
import { NavLink } from "react-router-dom"
import { getToken, getName } from "../store/auth/selector"
import { useSelector } from "react-redux"
import { logout } from "../store/auth/actions"
import { useDispatch } from "react-redux";
export default function Toolbar() {

    const dispatch = useDispatch();
    const token = useSelector(getToken)
    const name = useSelector(getName)
    console.log("testing token and name", token, name)

    const logoutUser = () => {
        dispatch(logout);
    }

    return (
        <div className="navbar">
            {!token ? (
                <NavLink to="/login">Login </NavLink>
            ) : (
                    <h1>Welcome {name}</h1>
                )
            }
            <button onClick={logoutUser}>LOgout</button>


        </div>

    )
}