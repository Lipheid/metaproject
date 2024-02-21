import React, { Component } from 'react'
import Info from './Info.js'
import './css/Result.css'
import Search from './Search.js'

export class Result extends Component {
  render() {
    return (
  <div className='result'>
    <Search></Search>
    <Info></Info>
    <Info></Info>
    <Info></Info>
    <Info></Info>
    <Info></Info>
    <Info></Info>
    <Info></Info>
    </div>
    )
  }
}

export default Result