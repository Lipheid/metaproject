// Result.js

import React, { Component } from 'react';
import Info from './Info.js';
import './css/Result.css';
import Search from './Search.js';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      jujitsuData: [], // jujitsu.json에서 가져온 데이터를 저장할 배열
      filteredData: [], // 선택된 지역에 해당하는 도장 정보를 저장할 배열
    };
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
    // 선택된 지역에 해당하는 도장 정보 필터링
    const filteredData = this.state.jujitsuData.filter(
      (item) => item.region === selectedLocation
    );
    this.setState({ filteredData });
  };

  render() {
    const { filteredData } = this.state;

    return (
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
    );
  }
}

export default Result;
