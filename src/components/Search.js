// Search.js
import React, { Component } from 'react';
import './css/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: null,
      locations: ['초기화면','세종', '제주'], 
      isLocateClick: false,
    };
  }

  handleLocateClick = () => {
    this.setState((prevState) => ({
      isLocateClick: !prevState.isLocateClick,
    }));
  };

  handleLocationClick = (location) => {
    this.setState({ selectedLocation: location, isLocateClick: false });
  };

  handleSearchClick = () => {
    const { selectedLocation } = this.state;
    this.props.onSearch(selectedLocation);
  };

  render() {
    const { selectedLocation, locations, isLocateClick } = this.state;

    return (
      <div className='search'>
        <div className='locate' onClick={this.handleLocateClick}>
          {selectedLocation ? selectedLocation : '기준 지역 검색'}
        </div>
        <div className={`locate-options ${isLocateClick ? 'show' : ''}`}>
          {locations.map((location) => (
            <div
              key={location}
              className='location-option'
              onClick={() => this.handleLocationClick(location)}
            >
              {location}
            </div>
          ))}
        </div>
        <div className='locateclick' onClick={this.handleSearchClick}>
          검색
        </div>
      </div>
    );
  }
}

export default Search;
