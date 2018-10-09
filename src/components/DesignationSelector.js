import React from 'react';

function DesignationSelector (props) {
    return (
        /* key is used to allow for resetting the select listbox when the key is updated (used to reset listbox when switching between states) */
        <select className="designation-selector" tabIndex={props.sideBarVisible ? "0" : "-1" } aria-label="Sort Parks by Designation" onChange={(event) => props.filterByDesignation(event.target.value)} defaultValue="Select All" key={props.timestamp} >
            <option value="Sort By Designation" disabled>Sort by Designation</option>
            <option value="Select All">Select All</option>
            <option value="National Parks">National Parks</option>
            <option value="National Monuments">National Monuments</option>
            <option value="Other Designations">Other Designations</option>
        </select>
    )
}

export default DesignationSelector;