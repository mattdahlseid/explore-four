import React from 'react';

function Search (props) {
    return (
        <div className="search-box">
            <input 
                type="text"
                className="search-bar" 
                placeholder="Search Parks"
                value={props.query} 
                onChange={(event) => props.updateQuery(event.target.value)}
                tabIndex={props.sideBarVisible ? "0" : "-1" }
                role="searchbox"
                aria-label="search by park name"
            >
            </input>
            
            <div className="results-showing">
                Displaying <span className="results-number">{props.filteredParks.length}</span> {props.filteredParks.length === 1 ? 'park' : 'parks'}
            </div>
        </div>
    )
}

export default Search;