import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import NavBarLink from "./NavBarLink"

// import './navbar.css';

const NavBar = ({currentUser, setCurrentUser}) => {
    let handleLogoutClick = () => {
        if (localStorage.getItem('currentUser')) {
            localStorage.clear();
            setCurrentUser('');
        }
    }

    let handleOtherClick = () => {

    }

    // useEffect(() => {
    //     setCurrentUser(localStorage.getItem('currentUser'))
    // }, [localStorage.getItem('currentUser')])

    return <div id="navbar-div">
        <Link to='/Home' style={{textDecoration: 'none'}}><NavBarLink text='Home'/></Link>
        <Link to='/Register' style={{textDecoration: 'none'}}><NavBarLink text="Register"/></Link>
        <Link to='/Login' style={{textDecoration: 'none'}}><NavBarLink text="Login"/></Link>
        <Link to='/Routines' style={{textDecoration: 'none'}}><NavBarLink text="Routines"/></Link>
        <Link to='/Activities' style={{textDecoration: 'none'}}><NavBarLink text="Activities"/></Link>
        <Link to='/NewRoutine' style={{textDecoration: 'none'}}><NavBarLink text="New Routine"/></Link>
        <Link to='/NewActivity' style={{textDecoration: 'none'}}><NavBarLink text="New Activity"/></Link>
        <Link to='/MyRoutines' style={{textDecoration: 'none'}}><NavBarLink text="My Routines"/></Link>
        {/* <Link to="/Home" style={{textDecoration: 'none'}}><NavbarLink text="Logout" clickHandler={handleLogoutClick}/></Link> */}
        <NavBarLink text="Logout"/>
    </div>

}

export default NavBar

