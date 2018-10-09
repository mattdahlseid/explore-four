import React from 'react';
import StateSelector from './StateSelector';
import Results from './Results';
import Search from './Search';
import DesignationSelector from './DesignationSelector';

function SideBar (props) {

    return (
        
        <div className="sidebar" style={{ marginLeft: props.sideBarVisible ? "0px" : "-300px", boxShadow: props.sideBarVisible ? "10px 0px 15px rgba(0, 0, 0, 0.3)" : "none" }} >
            <StateSelector {...props} />
            <DesignationSelector {...props} />
            <Search {...props} />
            <Results {...props} />
            <footer role="contentinfo">
                National Park Service Info from <a href="https://www.nps.gov/subjects/developer/index.htm" target="_blank" rel="noopener noreferrer" tabIndex={props.sideBarVisible ? "0" : "-1" }>NPS Data API</a>
            </footer>
        </div>

    )
}

export default SideBar;