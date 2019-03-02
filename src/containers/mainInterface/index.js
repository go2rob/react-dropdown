import React, { Component } from 'react';
import Dropdown from "../../widgets/dropDown/"
import './mainInterface.css';

class MainInterface extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="sub-container">
          <Info text="Regular Dropdown"/>
          <Dropdown/>
        </div>
        <div className="sub-container">
          <Info text="Grouped Dropdown"/>
          <Dropdown/>
        </div>
      </div>
    );
  }
}

export default MainInterface;


const Info = ({ text }) => {
  return (
    <div>
      <span>{text}</span>
    </div>
  )
}