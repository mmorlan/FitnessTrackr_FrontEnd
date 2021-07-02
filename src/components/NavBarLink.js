import React from 'react';

const NavBarLink = (props) => {
    return <h1 onClick={props.clickHandler}>{props.text}</h1>
}

export default NavBarLink;