import React, { Component } from 'react';
import './css/Info.css';

class Info extends Component {
  render() {
    const { name, master, address, phone, website } = this.props;

    return (
      <div className='info'>
        <div className='name'>{name}</div>
        <div className="master">{master}</div>
        <div className='mation'>
          <div className="address">주소: {address}</div>
          <div className="phone">연락처: {phone}</div>
          <div className="website">관련사이트: <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></div>
        </div>
      </div>
    );
  }
}

export default Info;
