/// Copyright (c) Pascal Brand
/// MIT License
///
/// Dropdown search bar to get town coordinates from town name
/// Here is a typical usage:
/*
  <RchGeoCoords
    defaultTownName= 'Bordeaux',            // name of the initial town we look for
    defaultDisplay= 'Bordeaux - Gironde',   // display name of the initial town we look for
    newCoordsCallback= (townInfo) => {      // callback to get information on the new selected town
      console.log(`Town name: ${townInfo.name}, longitude: ${townInfo.longitude}, latitude: ${townInfo.latitude}`); 
    },
    countryFilter= ['FR']                   // filter list (2-characters country). If null, town in worldwide
    maxInList={10}                          // return 10 max elements
  />
*/

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import RchDropdown from './RchDropdown';

// https://open-meteo.com/en/docs/geocoding-api
// get latitude and longitude from town name
async function getGeoCoordsCandidates(townStartsWith, filter, maxInList) {
  const get = await fetch("https://geocoding-api.open-meteo.com/v1/search?language=fr&count=100&name=" + townStartsWith);
  const responses = await get.json();

  if (responses && responses.results) {
    let r
    if (filter) {
      r = responses.results.filter((e) => filter.includes(e.country_code));
    } else {
      r = responses.results;
    }
    if (maxInList === -1) {
      return r;
    } else {
      return r.slice(0, maxInList);
    }
  } else {
    return null;
  }
}

function displayName(info) {
  return info.name + ' - ' + info.admin2;
}

function RchGeoCoords( { defaultTownName, defaultDisplay, newCoordsCallback, countryFilter=null, maxInList=-1 }) {
  const [ townCandidates, setTownCandidates ] = useState(null);

  function updateTownCandidates(townStartsWith) {
    getGeoCoordsCandidates(townStartsWith, countryFilter, maxInList)
      .then((candidates) => setTownCandidates(candidates));
  }

  useEffect(() => {
      getGeoCoordsCandidates(defaultTownName, countryFilter, maxInList)
        .then((dataTown) => newCoordsCallback(dataTown[0]));
  }, [])

  return (
    <RchDropdown
      type='searchbar'
      initialValue={defaultDisplay}
      list={townCandidates}
      onChange={ updateTownCandidates}
      onSelect={ ({item}) => newCoordsCallback(item) }
      valueFromItem={displayName}
      />
  )
}
export default RchGeoCoords;

RchGeoCoords.propTypes = {
  defaultTownName: PropTypes.string.isRequired,
  defaultDisplay: PropTypes.string.isRequired,
  newCoordsCallback: PropTypes.func.isRequired,
  countryFilter: PropTypes.arrayOf(PropTypes.string),
  maxInList: PropTypes.number,
};
