/// Copyright (c) Pascal Brand
/// MIT License
///
/// Dropdown search bar to get town coordinates from town name
/// Here is a typical usage:
/*
  const coords = RchGeoCoords({
    defaultTownName: 'Bordeaux',            // name of the initial town we look for
    newCoordsCallback: (townInfo) => {      // callback to get information on the new selected town
      console.log(`Town name: ${townInfo.name}, longitude: ${townInfo.longitude}, latitude: ${townInfo.latitude}`); 
    },
    countryFilter: ['FR']                   // filter list (2-characters country). If null, town in worldwide
  })
*/


import { useState, useEffect } from 'react'
import RchDropdown from './RchDropdown';

// https://open-meteo.com/en/docs/geocoding-api
// get latitude and longitude from town name
async function getGeoCoordsCandidates(townStartsWith, filter) {
  const get = await fetch("https://geocoding-api.open-meteo.com/v1/search?language=fr&count=100&name=" + townStartsWith);
  const responses = await get.json();

  if (responses && responses.results) {
    if (filter) {
      return responses.results.filter((e) => filter.includes(e.country_code));
    } else {
      return responses.results;
    }
  } else {
    return null;
  }
}

function displayName(info) {
  return info.name + ' - ' + info.admin2;
}

function RchGeoCoords( { defaultTownName, newCoordsCallback, countryFilter=null }) {
  const [ townInfo, setTownInfo ] = useState(null);
  const [ townCandidates, setTownCandidates ] = useState(null);

  function updateTownCandidates(townStartsWith) {
    getGeoCoordsCandidates(townStartsWith, countryFilter)
      .then((candidates) => setTownCandidates(candidates));
  }

  useEffect(() => {
    if (!townInfo) {
      getGeoCoordsCandidates(defaultTownName, countryFilter)
        .then((dataTown) => setTownInfo(dataTown[0]));
    }
  })

  useEffect(() => {
    if (newCoordsCallback && townInfo) {
      newCoordsCallback(townInfo);
    }
  }, [townInfo])

  function getCoords() {
    return townInfo;
  }

  function render() {
    if (townInfo) {
      return (
        <RchDropdown
          type='searchbar'
          initialValue={ displayName(townInfo) }
          list={townCandidates}
          onChange={ updateTownCandidates}
          onSelect={ ({item}) => setTownInfo(item) }
          valueFromItem={displayName}
          />
      )
    } else {
      return null;
    }
  }
  
  return {
    getCoords,
    render,
  }
}
export default RchGeoCoords;
