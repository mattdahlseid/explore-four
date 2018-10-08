import React from 'react';

function NavBar (props) {
    return (
        <nav className="navBar">
            { /* couldn't get button tag to function properly (pressing enter wasn't responding) so used <a> instead */ }
            <a
            type="button"
            tabIndex="0"
            aria-label="Open Menu"
            role="button"
            className="toggleTab" 
            onKeyPress={props.toggleTab}
            onClick={props.toggleTab} 
            title={ props.sideBarVisible ? "Close Menu" : "Open Menu" } 
            >
            <div className="button-background" style={{ padding: props.sideBarVisible ? "3px" : "7px", backgroundColor: props.sideBarVisible ? "rgb(236, 116, 116)" : "black", border: props.sideBarVisible ? "4px solid rgb(236, 116, 116)" : "4px solid black" }}>
            <div className="button-square" style={{ backgroundColor: props.sideBarVisible ? "black" : "rgb(236, 116, 116)"}}></div>
            <div className="button-square" style={{ backgroundColor: props.sideBarVisible ? "black" : "rgb(236, 116, 116)"}}></div>
            <div className="button-square" style={{ backgroundColor: props.sideBarVisible ? "black" : "rgb(236, 116, 116)"}}></div>
            <div className="button-square" style={{ backgroundColor: props.sideBarVisible ? "black" : "rgb(236, 116, 116)"}}></div>
        </div>
            </a>

            <header className="navheader" style={{ fontWeight: props.sideBarVisible ? 400 : 900, backgroundPosition: props.sideBarVisible ? "left bottom" : "right bottom" }}>

                <div className="text" style={{ color: props.sideBarVisible ? "white" : "black", fontSize: props.sideBarVisible ? "21px" : "23px", paddingTop: props.sideBarVisible ? "7px" : "7px"}}>
                    { props.sideBarVisible ? 'FIND YOUR PARK' : 'EXPLORE FOUR' }
                </div>

            </header>
        </nav>
    )
}

export default NavBar;