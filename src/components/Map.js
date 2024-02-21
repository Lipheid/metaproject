
import React, { useEffect } from 'react';
import './css/Map.css';
import markerPositions from './markerPosition.js';  
import markerimg from './img/marker.png';
const { kakao } = window;

function Map() {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.5640736, 127.3204855),
      level: 7,
    };


    const map = new kakao.maps.Map(container, options);

    const markerImage = new kakao.maps.MarkerImage(
      markerimg,
      new kakao.maps.Size(48, 72),
      { offset: new kakao.maps.Point(24, 72) } 
    );

    markerPositions.forEach(({ lat, lng }) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        image: markerImage,
      });



      marker.setMap(map);
    });
  }, []);

  return <div id="map" className="map"></div>;
}

export default Map;
