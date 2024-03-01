// Map.js
import React, { useEffect, useState } from 'react';
import './css/Map.css';
import markerPositions from './markerPosition.js';  
import markerimg from './img/marker.png';
const { kakao } = window;

const locationCoordinates = {
  세종: { lat: 36.5053544, lng: 127.2663147 },
  제주: { lat: 33.4996215, lng: 126.5311884 },
  // 추가적인 지역이 있다면 여기에 계속 추가할 수 있습니다.
};

function Map({ selectedLocation }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.5640736, 127.3204855),
      level: 7,
    };

    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);

    if (map && selectedLocation) {
      const { lat, lng } = locationCoordinates[selectedLocation];
      console.log('Selected Location Coordinates:', { lat, lng });

      const moveLatLon = new kakao.maps.LatLng(lat, lng);
      map.setCenter(moveLatLon);}
      
  },  [map, selectedLocation]);





  return <div id="map" className="map"></div>;
}

export default Map;
