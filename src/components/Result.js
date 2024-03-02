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
      jujitsuData: [],
      filteredData: [],
      selectedLocation: null,
    };

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const jsonFilePath = '/jujitsu.json';

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
    const filteredData = selectedLocation === '초기화면'
      ? []
      : this.state.jujitsuData.filter((item) => item.region === selectedLocation);

    if (this.mapRef.current) {
      this.mapRef.current.updateMap(selectedLocation, filteredData);
    }

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
          <Map selectedLocation={selectedLocation} filteredData={filteredData} ref={this.mapRef} />
        </div>
      </div>
    );
  }
}

export default Result;
