// Result.js

import React, { Component } from 'react';
import Info from './Info.js';
import './css/Result.css';
import Search from './Search.js';
import Map from './Map.js';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      jujitsuData: [], // jujitsu.json에서 가져온 데이터를 저장할 배열
      filteredData: [], // 선택된 지역에 해당하는 도장 정보를 저장할 배열
      selectedLocation: null, // 선택된 지역을 저장할 상태 변수
    };

    // Map 컴포넌트의 ref를 생성합니다.
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // 가상의 jujitsu.json 파일 경로
    const jsonFilePath = '/jujitsu.json';

    // JSON 파일에서 데이터 가져오기
    fetch(jsonFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((jujitsuData) => this.setState({ jujitsuData }))
      .catch((error) => console.error('Error fetching data:', error));
  }

  handleSearch = (selectedLocation) => {
    // 선택된 지역이 '전체'일 경우 모든 데이터를 보여주지 않음
    const filteredData = selectedLocation === '전체'
      ? []
      : this.state.jujitsuData.filter((item) => item.region === selectedLocation);

    // Map 컴포넌트의 updateMap 메서드를 호출하여 지도 업데이트
    if (this.mapRef.current) {
      this.mapRef.current.updateMap(selectedLocation);
    }

    // 지도에 선택된 지역으로 이동
    this.setState({ filteredData, selectedLocation });
  };

  render() {
    const { filteredData, selectedLocation } = this.state;

    return (
      <div className='body'>
        <div className='result'>
          <Search onSearch={this.handleSearch} />
          {filteredData.map((info) => (
            <Info
              key={info.id}
              name={info.name}
              master={info.master}
              address={info.address}
              phone={info.phone}
              website={info.website}
            />
          ))}
        </div>
        <div className='map'>
          <Map selectedLocation={selectedLocation} ref={this.mapRef} />
        </div>
      </div>
    );
  }
}

export default Result;
