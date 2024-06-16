import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';


const Navbar = ({ menuObjData }) => {
    return (<div className={`nav-elements navbar-expand-md customNavElements ${menuObjData && menuObjData.enable && 'shadow active'}`}>
        <ul className='navbar-nav h-100 align-items-md-center'>
            <li>
                <NavLink className={`p-0 nav-link ${menuObjData && menuObjData.enable ? 'text-black' : 'text-white opacity-75'}`} to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className={`py-0 nav-link ${menuObjData && menuObjData.enable ? 'text-black' : 'text-white opacity-75'}`} to="/templates">Templates</NavLink>
            </li>
            <li>
                <NavLink className={`py-0 nav-link ${menuObjData && menuObjData.enable ? 'text-black' : 'text-white opacity-75'}`} to="/clients">Clients</NavLink>
            </li>
            <li>
                <NavLink className={`py-0 nav-link ${menuObjData && menuObjData.enable ? 'text-black' : 'text-white opacity-75'}`} to="/payments">Payments</NavLink>
            </li>
            <li>
                <NavLink className={`py-0 nav-link ${menuObjData && menuObjData.enable ? 'text-black' : 'text-white opacity-75'}`} to="/projects">Projects</NavLink>
            </li>
            <li>
                <NavLink className={`py-0 nav-link ${menuObjData && menuObjData.enable ? 'text-black' : 'text-white opacity-75'}`} to="/usermanagement">User Management</NavLink>
            </li>
        </ul>
    </div>)
}

export default Navbar;