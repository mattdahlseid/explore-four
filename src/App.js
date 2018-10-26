import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Map from './components/Map';
import SideBar from './components/SideBar';
import escapeRegExp from 'escape-string-regexp';

const api = "https://api.nps.gov/api/v1/parks?parkCode=grca,pefo,sagu,cach,cagr,chir,pima,moca,nava,orpi,para,pisp,sucr,tont,tuzi,waca,wupa,lake,fobo,hutr,coro,tuma,blca,grsa,meve,romo,colm,dino,flfo,yuho,cure,beol,sand,cave,azru,band,cavo,elma,elmo,foun,gicl,petr,sapu,whsa,chcu,peco,vall,arch,brca,cany,care,zion,cebr,hove,nabr,rabr,tica,glca,gosp%2CCO%2CNM%2CUT&limit=70&fields=images&sort=name"

class App extends Component {

  constructor() {
    super();
    this.state = {
      fetchError: false,
      parks: [],
      filteredParks: [],
      filteredParksBase: [],
      parksTest: [],
      markers: [],
      filteredMarkers: [],
      filteredMarkersBase: [],
      centerState: {
        lat: 36.998981,
        lng: -109.045189
      },
      zoomState: 5.6,
      sideBarVisible: false,
      query: '', 
      timestamp: ''
    }

    this.selectByState = this.selectByState.bind(this);
    this.filterByDesignation = this.filterByDesignation.bind(this);
    this.filterByQuery = this.filterByQuery.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.toggleTab = this.toggleTab.bind(this);

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleParkClick = this.handleParkClick.bind(this);
    this.closeMarkers = this.closeMarkers.bind(this);
    this.handleParkHover = this.handleParkHover.bind(this);
    this.handleParkExit = this.handleParkExit.bind(this);
    this.handleMarkerHover = this.handleMarkerHover.bind(this);
    this.handleMarkerExit = this.handleMarkerExit.bind(this);

  }

  
  componentDidMount() {

    fetch(`${api}`)
      .then(res => res.json())
      .then(res => {
        const parksList = res.data;
        parksList.forEach(park => {
          park.isSelected = false;
        });
        this.setState({
          parks: parksList,
          filteredParks: parksList,
          filteredParksBase: parksList
        })
      })
      // create markers for map by mapping through filteredParks
      .then(() => {
        const markers = this.state.filteredParks.map(park => {
          const [ latitude, longitude ] = park.latLong.split(',');
          const realLat = latitude.replace('lat:','');
          const realLng = longitude.replace(' long:','');
          return {
            lat: realLat,
            lng: realLng,
            isOpen: false,
            isVisible: true,
            isHovered: false,
            id: park.id,
            fullName: park.fullName,
            state: park.states,
            designation: park.designation
          };
        }) 
        this.setState({ 
          markers: markers, 
          filteredMarkers: markers,
          filteredMarkersBase: markers
        })
      }    
      )
      /* catch fetch error
      * error messages displayed over map 
      * and in results list box when fetchError: true
      */ 
      .catch(err => {
        this.setState({
          fetchError: true
        });
      })
      
  }
  
  // narrow results by state
  selectByState(state) {
    // revert to no selected parks in results list
    this.unselectParks();
    // **** All steps repeated for each state and an all states option  ****
    if (state.includes('AZ')) {
      // filter markers that include selected state into a variable 
      const azMarkers = this.state.markers.filter(marker => marker.state.includes('AZ'));
      // close info window if one is open 
      azMarkers.map(marker => marker.isOpen = false);
      /*
       * setState of filteredParks based on parks that include selected state 
       * setState of filteredParksBase as the same to have for reference if 
       *   filteredParks is filtered by designation
       * reset map center for selected state 
       * set appropriate zoom for selected state 
       * setState of filtered markers 
       */
      this.setState({ 
        filteredParks: this.state.parks.filter(park => park.states.includes('AZ')),
        filteredParksBase: this.state.parks.filter(park => park.states.includes('AZ')),
        centerState: {lat: 34.248928, lng: -111.093731},
        zoomState: 7,
        filteredMarkers: azMarkers,
        filteredMarkersBase: azMarkers
      })
    } else if (state.includes('CO')) {
      const coMarkers = this.state.markers.filter(marker => marker.state.includes('CO'));
      coMarkers.map(marker => marker.isOpen = false);
      this.setState({ 
        filteredParks: this.state.parks.filter(park => park.states.includes('CO')),
        filteredParksBase: this.state.parks.filter(park => park.states.includes('CO')),
        centerState: {lat: 39.150051, lng: -105.782067},
        zoomState: 7,
        filteredMarkers: coMarkers,
        filteredMarkersBase: coMarkers
      });
    } else if (state.includes('NM')) {
     const nmMarkers = this.state.markers.filter(marker => marker.state.includes('NM'));
     nmMarkers.map(marker => marker.isOpen = false);
      this.setState({ 
        filteredParks: this.state.parks.filter(park => park.states.includes('NM')),
        filteredParksBase: this.state.parks.filter(park => park.states.includes('NM')),
        centerState: {lat: 34.61994, lng: -105.87009},
        zoomState: 7,
        filteredMarkers: nmMarkers,
        filteredMarkersBase: nmMarkers
      });
    } else if (state.includes('UT')) {
      const utMarkers = this.state.markers.filter(marker => marker.state.includes('UT'));
      utMarkers.map(marker => marker.isOpen = false);
      this.setState({ 
        filteredParks: this.state.parks.filter(park => park.states.includes('UT')),
        filteredParksBase: this.state.parks.filter(park => park.states.includes('UT')),
        centerState: {lat: 39.36098, lng: -111.093731},
        zoomState: 7,
        filteredMarkers: utMarkers,
        filteredMarkersBase: utMarkers
      });
    } else if (state.includes('AllStates')) {
      const allStateMarkers = this.state.markers.filter(marker => marker.state.includes(''));
      allStateMarkers.map(marker => marker.isOpen = false);
      this.setState({ 
        filteredParks: this.state.parks.filter(park => park.states),
        filteredParksBase: this.state.parks.filter(park => park.states),
        centerState: {lat: 36.998981, lng: -109.045189},
        zoomState: 5.6,
        filteredMarkers: allStateMarkers,
        filteredMarkersBase: allStateMarkers
      });
    }
    // reset query when a new state is selected
    // update key to reset designation select input (w/timestamp)
    this.setState({
      query: '',
      timestamp: Date.now()
    });
  }

  // narrow results by designation
  filterByDesignation(designation) {
    // revert to no selected parks in results list
    this.unselectParks();
    //***** steps repeated for each park designation *****
    if (designation.includes('Select All')) {
      // set variable for all parks
      const allParks = this.state.filteredParksBase.filter(park => park.designation.includes('National'));
      // set variable for all markers
      const allParkMarkers = this.state.filteredMarkersBase.filter(marker => marker.designation.includes('National'));
      // close any open infoWindow
      allParkMarkers.map(marker => marker.isOpen = false);
      // setState for filtered parks and markers
      this.setState({ 
        filteredParks: allParks, 
        filteredMarkers: allParkMarkers 
      });
    } else if (designation.includes('National Park') ) {
      const nationalParks = this.state.filteredParksBase.filter(park => park.designation.includes('National Park'));
      const nationalParkMarkers = this.state.filteredMarkersBase.filter(marker => marker.designation.includes('National Park'));
      nationalParkMarkers.map(marker => marker.isOpen = false);
      this.setState({ 
        filteredParks: nationalParks, 
        filteredMarkers: nationalParkMarkers 
      });
    } else if (designation.includes('National Monument')) {
      const nationalMonuments = this.state.filteredParksBase.filter(park => park.designation.includes('National Monument'));
      const nationalMonumentMarkers = this.state.filteredMarkersBase.filter(marker => marker.designation.includes('National Monument'));
      nationalMonumentMarkers.map(marker => marker.isOpen = false);
      this.setState({ 
        filteredParks: nationalMonuments, 
        filteredMarkers: nationalMonumentMarkers 
      });
    } else {
      const otherParks = this.state.filteredParksBase.filter(park => park.designation.includes('National Historic Site') || park.designation.includes('National Recreation Area') || park.designation.includes('National Memorial') || park.designation.includes('National Historical Park') || park.designation.includes('National Preserve'));
      const otherParkMarkers = this.state.filteredMarkersBase.filter(marker => marker.designation.includes('National Historic Site') || marker.designation.includes('National Recreation Area') || marker.designation.includes('National Memorial') || marker.designation.includes('National Historical Park') || marker.designation.includes('National Preserve'));
      otherParkMarkers.map(marker => marker.isOpen = false);
      this.setState({ 
        filteredParks: otherParks,
        filteredMarkers: otherParkMarkers
       })
    }
    // clear query on designation filter
    this.setState({
      query: ''
    })
  }

  // narrow results by query
  filterByQuery(query) {
    if (query.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState({ 
        // filter parks that match query
        filteredParks: this.state.filteredParksBase.filter(park => match.test(park.fullName)),
        // filter markers that match query
        filteredMarkers: this.state.filteredMarkersBase.filter(marker => match.test(marker.fullName)) }) 
    } else {
      // set state for filtered parks and markers
      // reset selecter input with new timestamp for input key
      this.setState({ 
        filteredParks: this.state.filteredParksBase,
        filteredMarkers: this.state.filteredMarkersBase,
        timestamp: Date.now()
       });
    }
  }

  // update query and run filterByQuery
  updateQuery = (query => {
    // revert to no selected parks in results list
    this.unselectParks();
    this.setState({
      query,
      timestamp: Date.now()
     });
    this.filterByQuery(query);
    // close open infoWindows
    this.state.filteredMarkers.map(marker => marker.isOpen = false)
  })

  // toggle visibility of sidebar when button is clicked
  toggleTab = () => {
    this.setState((prevState) => {
      return { sideBarVisible: !prevState.sideBarVisible }
    });
  }

  // close open infoWindows when another marker is clicked
  closeInfoWindows = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers, markers)} )
  }

  // open infoWindow of clicked marker
  handleMarkerClick = (marker) => {
    this.closeInfoWindows();
    this.unselectParks();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) })
    const selectedPark = this.state.filteredParks.find(park => park.id === marker.id);
    selectedPark.isSelected = true;
    this.setState({ filteredParks: Object.assign(this.state.filteredParks, selectedPark) })
  }

  handleMarkerHover = (marker) => {
    marker.isHovered = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) })
  }

  handleMarkerExit = (marker) => {
    marker.isHovered = false;
    this.setState({ markers: Object.assign(this.state.markers, marker) })
  }

  // reverts to no selected park in results list
  unselectParks = () => {
    const unselectedParks = this.state.filteredParks;
    unselectedParks.map(park => park.isSelected = false)
    this.setState({
      filteredParks: unselectedParks
    })
  }

   /* 
   * open infoWindow of appropriate marker when listItem is clicked 
   * close open infoWindows before opening a new one
  */
  handleParkClick = (park) => {
    
    const marker = this.state.markers.find(marker => marker.id === park.id);
    if (marker.isOpen) {
      this.closeInfoWindows();
    } else {
    this.closeInfoWindows();
    marker.isOpen = true;
    this.setState({ 
      markers: Object.assign(this.state.markers, marker),
     })
    }

    if (park.isSelected) {
      this.unselectParks();
    } else {
      this.unselectParks();
      park.isSelected = true;
      this.setState({ filteredParks: Object.assign(this.state.filteredParks, park)})
    }
  }

  // highlight marker when a park list item is hovered over
  handleParkHover = (park) => {
    const marker = this.state.markers.find (marker => marker.id === park.id);
    marker.isHovered = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) })
  }

  // undo marker highlight when cursor leaves park list item
  handleParkExit = (park) => {
    const marker = this.state.markers.find (marker => marker.id === park.id);
    marker.isHovered = false;
    this.setState({ markers: Object.assign(this.state.markers, marker) })
  }

  // close marker infoWindow when map is clicked
  closeMarkers = () => {
    const closedMarkers = this.state.filteredMarkers;
    closedMarkers.map(marker => marker.isOpen = false)
    this.setState({
      filteredMarkers: closedMarkers
    })
    this.unselectParks();
  }

  render() {

          return (

          <div className="App">

            <NavBar {...this.state} toggleTab={this.toggleTab} />
            
            <SideBar {...this.state} filterByQuery={this.filterByQuery} filterByDesignation={this.filterByDesignation} selectByState={this.selectByState} handleParkClick={this.handleParkClick} handleParkHover={this.handleParkHover} handleParkExit={this.handleParkExit} updateQuery={this.updateQuery} />
            
            <Map {...this.state} handleMarkerClick={this.handleMarkerClick} closeMarkers={this.closeMarkers} handleMarkerHover={this.handleMarkerHover} handleMarkerExit={this.handleMarkerExit} />

          </div>
        );
      
    }
  }

export default App;
