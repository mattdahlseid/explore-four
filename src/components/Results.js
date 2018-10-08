import React from 'react';

function Results (props) {
    return (
        <div className="results-box" aria-label="Search Results" role="list" tabIndex={props.sideBarVisible ? "0" : "-1" }>
        { /* Message to be displayed when there's an API fetch error */ }
        {props.fetchError && (
            <div className="fetchErrorResults">
                <h1>Error fetching data from National Park Service API</h1>
            </div>
        )}
        {!props.fetchError && (
            <ul>
                { // create list item for each filtered park
                props.filteredParks.map(park => (
                    <li 
                        className="parkListItem"                        
                        role="button"
                        tabIndex={props.sideBarVisible ? "0" : "-1" }
                        onKeyPress={() => props.handleParkClick(park)}
                        onClick={() => props.handleParkClick(park)} 
                        key={park.id}                            
                    >
                        <div className="results-park">                
                        <p className="results-park-name">
                            {park.name}
                        </p>
                        <p className="results-park-designation">
                            {park.designation}
                        </p>
                        </div>
                        <br></br>
                        <div className="results-website">
                            <a href={`${park.url}`} target="_blank" rel="noopener noreferrer" tabIndex={props.sideBarVisible ? "0" : "-1" } title={`Visit ${park.name} Website`}><i className="fas fa-globe"></i></a>
                        </div>
                    </li>
                ))
                }
            </ul>
        )}
        </div>

    )
}

export default Results;