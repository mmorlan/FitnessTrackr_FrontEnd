import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import NavBarLink from "./NavBarLink"

// import './navbar.css';

const NavBar = ({currentUser, setCurrentUser}) => {
    let handleLogoutClick = () => {
        // if (localStorage.getItem('currentUser')) {
            localStorage.clear();
            setCurrentUser('');
        // }
        console.log('clearing local storage')
    }

    let handleOtherClick = () => {

    }

    useEffect(() => {
        setCurrentUser(localStorage.getItem('currentUser'))
    }, [localStorage.getItem('currentUser')])

    return <div id="navbar-div">
        
        {!(currentUser) ? <>
        <Link to='/Register' style={{textDecoration: 'none'}}><NavBarLink text="Register" clickHandler={handleOtherClick}/></Link>
        <Link to='/Login' style={{textDecoration: 'none'}}><NavBarLink text="Login" clickHandler={handleOtherClick}/></Link>
        </> :
        <Link to="/Home" style={{textDecoration: 'none'}}><NavBarLink text="Logout" clickHandler={handleLogoutClick}/></Link>}

        <Link to='/Home' style={{textDecoration: 'none'}}><NavBarLink text='Home' clickHandler={handleOtherClick}/></Link>
        <Link to='/Routines' style={{textDecoration: 'none'}}><NavBarLink text="Routines" clickHandler={handleOtherClick}/></Link>
        <Link to='/Activities' style={{textDecoration: 'none'}}><NavBarLink text="Activities" clickHandler={handleOtherClick}/></Link>

        {(currentUser) ? <>
        <Link to='/NewRoutine' style={{textDecoration: 'none'}}><NavBarLink text="New Routine" clickHandler={handleOtherClick}/></Link>
        <Link to='/NewActivity' style={{textDecoration: 'none'}}><NavBarLink text="New Activity" clickHandler={handleOtherClick}/></Link>
        <Link to='/MyRoutines' style={{textDecoration: 'none'}}><NavBarLink text="My Routines" clickHandler={handleOtherClick}/></Link>
        </> : '' }
    </div>

}

export default NavBar

