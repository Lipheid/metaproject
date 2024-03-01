// Map.js

import React, { useEffect } from 'react';
import './css/Map.css';
import markerPositions from './markerPosition.js';  
import markerimg from './img/marker.png';
const { kakao } = window;

function Map({ selectedLocation }) {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.5640736, 127.3204855),
      level: 12,
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

    // 선택된 지역에 해당하는 도장 정보가 있을 경우 지도를 해당 지역으로 이동
    if (selectedLocation) {
      const cityCoordinates = {
        전체: { lat: 36.5640736, lng: 127.3204855, level:13},
        세종: { lat: 36.5640736, lng: 127.3204855, level: 7 },  // 세종의 예시 좌표 및 level
        제주: { lat: 33.3666, lng: 126.53, level: 9 },  // 제주의 예시 좌표 및 level
      };

      const selectedCoordinates = cityCoordinates[selectedLocation];

      if (selectedCoordinates) {
        const { lat, lng, level } = selectedCoordinates;
        // level 값을 조절하여 지도의 확대 수준을 설정할 수 있습니다.
        map.setLevel(level || options.level);  // 선택된 지역에 level이 없을 경우 기본값 사용
        map.setCenter(new kakao.maps.LatLng(lat, lng));
      }
    }
  }, [selectedLocation]);

  return <div id="map" className="map"></div>;
}

export default Map;
