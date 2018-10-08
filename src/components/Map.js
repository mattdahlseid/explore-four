import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MapStyle from '../MapStyle';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    zoom={props.zoomState}
    center={props.centerState}
    defaultOptions={{ styles: MapStyle }}
    onClick={props.closeMarkers}
  > {/* map through filteredMarkers to create markers */}
    {props.filteredMarkers.filter(marker => marker.isVisible).map((marker, index, arr) => {
       // get info for each marker by matching marker.id to park.id 
       const parkInfo = props.parks.find(park => park.id === marker.id);
       // icon source https://www.kisspng.com/png-google-maps-computer-icons-symbol-map-marker-967954/
       const markerBlack = "images/black_marker.png";
       const markerRed = "images/red_marker.png";

       return (
        <Marker 
          key={index} 
          tabIndex="0"
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          onClick={ () => props.handleMarkerClick(marker) }
          title={ marker.fullName }
          icon={ marker.isOpen ? {
            url: markerRed,
            scaledSize: new window.google.maps.Size(20, 25)
          } : { url: markerBlack, scaledSize: new window.google.maps.Size(20, 25) }}
        >
    { marker.isOpen &&
    <InfoWindow>
      <div className="iw">
      <div className="iw-park-name">
        {parkInfo.name}
        <br></br>
        <span className="iw-designation">
          {parkInfo.designation}
        </span>
      </div>
      <a href={parkInfo.url} target="_blank" rel="noopener noreferrer" title={ `Visit ${parkInfo.name} website` } >
      <img src={parkInfo.images[0].url} className="iw-image" alt={parkInfo.images[0].altText}/>
      </a>
      <div className="iw-image-credit">{parkInfo.images[0].credit}</div>
      <div className="iw-description">
        {parkInfo.description}
      </div>
      </div>
    </InfoWindow>
    }
    </Marker>
       );
     })}
  </GoogleMap>
))


class Map extends Component {
  constructor() {
    super();
    this.state ={
      authError: false
    }
  }

  /* documentation for catching Google Maps authentication failure https://developers.google.com/maps/documentation/javascript/events#auth-errors
  */
  componentDidMount() {
    window.gm_authFailure = () => {
      this.setState({ authError: true });
    };
  }

  render() {
    return ( 

      <main className="theMap" style={{ width: this.props.sideBarVisible ? "calc(100% - 300px)" : "100%" }}>
      { /* Display error over map if no data received from NPS API */ }
      {this.props.fetchError && (
        <div className="fetchErrorMap">
          <div className="fetchErrorMapBox">
            <p>Error fetching location data</p>
          </div>
        </div>
      )}
          
      { /* Check for load error. If no error, show map. If there is an error, show failed to load screen */ }
      {!this.state.authError && (
        <MyMapComponent
          role="application"
          {...this.props}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB3z0ZwjWqr2h3_x2vbPahVhsn86srQNiw"
          loadingElement={<div style={{ height: `100vh` }} />}
          containerElement={<div style={{ height: `calc(100% - 40px)` }} />}
          mapElement={<div className="theMap" />}
        />
      )}
      {this.state.authError && (
        // failed to load screen
        <div className="mapFailBG">
        <img className="mapFailImage" src="/images/all_dunes_m.jpg" alt="A view over an expanse of sand dunes at Great Sand Dunes National Park"></img>
          <div className="mapFailMessageContainer">
            <h1 className="mapFailMessage">
            Google Maps<br></br>Failed to Load</h1>
          </div>
      </div>
      )}
                
      </main>

    )
  }
}

export default Map;