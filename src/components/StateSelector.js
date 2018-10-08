import React from 'react';

function StateSelector (props) {

    /* resource for passing active class among buttons
    *  https://www.w3schools.com/howto/howto_js_active_element.asp
    */
    
    let buttons = document.getElementsByClassName('state-box');
    for (let i = 0; i < buttons.length; i++ ) {
        buttons[i].addEventListener('click', function() {
            let current = document.getElementsByClassName('active');
            current[0].className = current[0].className.replace(' active', '')
            this.className += ' active';
        })
    }

    return (
        <div className="state-container" tabIndex={props.sideBarVisible ? "0" : "-1"} aria-label="Select Parks by State" role="menu">
            <button className="state-box" tabIndex={props.sideBarVisible ? "0" : "-1" } value="UT" aria-label="Utah" role="menuitem" onClick={(event) => props.selectByState(event.target.value)}>
                UT
            </button>
            <button className="state-box" tabIndex={props.sideBarVisible ? "0" : "-1" } value="CO" aria-label="Colorado" role="menuitem" onClick={(event) => props.selectByState(event.target.value)}>
                CO
            </button>
            <button className="state-box" tabIndex={props.sideBarVisible ? "0" : "-1" } value="AZ" aria-label="Arizona" role="menuitem" onClick={(event) => props.selectByState(event.target.value)}>
                AZ
            </button>
            <button className="state-box" tabIndex={props.sideBarVisible ? "0" : "-1" } value="NM" aria-label="New Mexico" role="menuitem" onClick={(event) => props.selectByState(event.target.value)}>
                NM
            </button>
            <button className="state-box-four-corners state-box active" tabIndex={props.sideBarVisible ? "0" : "-1" } value="AllStates" aria-label="Select All States" role="menuitem" onClick={(event) => props.selectByState(event.target.value)} />
        </div>
    )
}

export default StateSelector;