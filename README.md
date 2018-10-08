# Explore Four Project Overview

From Zion, to the Rocky Mountains, to Carlsbad Caverns, to the Grand Canyon, the Four Corners region of the United States is home to some of the most spectacular outdoor destinations in the world. The Explore Four App is a guide to these natural wonders, showing users where to find national parks, national monuments, and other National Park Service sites within the states of Arizona, Colorado, New Mexico, and Utah. Sort parks by state, by designation, or by query to help you plan your next trip through the Desert Southwest and Mountain West.

This app was created as the final project of [Udacity's Front End Developer Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). It's built with React.js and utilizes the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) and the [National Park Service API](https://www.nps.gov/subjects/developer/index.htm). 

<a href="https://mattdahlseid.github.io/explore-four/" target=”_blank”><img src="https://preview.ibb.co/cXRdEU/e4_home.png" alt="e4_home" border="0"></a>

<a href="https://mattdahlseid.github.io/explore-four/" target=”_blank”><img src="https://preview.ibb.co/h4VDEU/e4_nat_bridges.png" alt="e4_nat_bridges" border="0"></a>

## Getting Started

Check out the live [Explore Four App](https://mattdahlseid.github.io/explore-four/), hosted on [GitHub Pages](https://pages.github.com/).

### For Developers

1. [Download](x-github-client://openRepo/https://github.com/mattdahlseid/explore-four) or clone the [repository](https://github.com/mattdahlseid/explore-four).
2. Navigate into the `explore-four` file in your terminal.
3. Run `npm install` to install necessary dependencies.
4. Run `npm start` to serve the project and view in your browser.
5. Visit the [Google Maps Platform](https://cloud.google.com/maps-platform/) to get your own free Maps JavaScript API key. 
Navigate into the `explore-four/src/components/Map.js` file. 
Insert your key here: `googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=[REPLACE KEY WITH YOUR OWN]`.
6. Visit nps.gov for [National Park Service Developer resources](https://www.nps.gov/subjects/developer/index.htm).

## Dependencies

* This project was boostrapped with [`create-react-app`](https://github.com/facebookincubator/create-react-app)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [`react-google-maps`](https://github.com/tomchentw/react-google-maps) integration component
* [`react-dom`](https://www.npmjs.com/package/react-dom)
* ['escape-string-regexp`](https://github.com/sindresorhus/escape-string-regexp)
* [National Park Service API](https://www.nps.gov/subjects/developer/index.htm)
* Google Fonts - [Raleway](https://fonts.google.com/specimen/Raleway?selection.family=Raleway), [Assistant](https://fonts.google.com/specimen/Assistant)
* FontAwesome - [Globe icon](https://fontawesome.com/icons/globe?style=solid)
* Snazzy Maps - Map Styles adapted from Ann Kwilinski's [Antiqued Gold](https://snazzymaps.com/style/12903/antiqued-gold)
* kisspng - [black map marker icon](https://www.kisspng.com/png-google-maps-computer-icons-symbol-map-marker-967954/)

## Acknowledgments

Fellow Udacity student [Forrest Walker](https://github.com/forrestw92) has a great [YouTube walkthrough](https://www.youtube.com/watch?v=ktc8Gp9jD1k&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP) that helped me get unstuck when I was working on getting my markers' infoWindows to open when clicking on their associated list items.
Members of the awesome Udacity FEND slack community shared a great deal of helpful advice and resources throughout the course.
