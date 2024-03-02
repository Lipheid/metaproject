// Map.js

import React, { useEffect, useRef } from 'react';
import './css/Map.css';
import markerimg from './img/marker.png';
const { kakao } = window;

function Map({ selectedLocation, filteredData }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.5640736, 127.3204855),
      level: 13,
    };

    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;

    const markerImage = new kakao.maps.MarkerImage(
      markerimg,
      new kakao.maps.Size(48, 72),
      { offset: new kakao.maps.Point(24, 72) }
    );


    const markerClickHandler = (position, level) => {
      map.setLevel(level);
      map.setCenter(position);
    };


    if (filteredData && filteredData.length > 0) {
      filteredData.forEach((info) => {
        const { lat, lng } = info;

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lng),
          image: markerImage,
        });


        kakao.maps.event.addListener(marker, 'click', () => markerClickHandler(marker.getPosition(), 4)); 

        marker.setMap(map);
      });
    }

 
    if (selectedLocation) {
      const cityCoordinates = {
        초기화면: { lat: 36.5640736, lng: 127.3204855, level: 13 },
        세종: { lat: 36.5400000, lng: 127.3204855, level: 7 }, 
        제주: { lat: 33.3666, lng: 126.53, level: 9 },  
      };

      const selectedCoordinates = cityCoordinates[selectedLocation];

      if (selectedCoordinates) {
        const { lat, lng, level } = selectedCoordinates;
        map.setLevel(level || options.level);
        map.setCenter(new kakao.maps.LatLng(lat, lng));
      }
    }
  }, [selectedLocation, filteredData]);

  return <div id="map" className="map"></div>;
}

export default Map;
