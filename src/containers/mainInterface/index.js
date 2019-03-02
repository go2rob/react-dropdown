import React, { Component } from 'react';
import _ from "lodash";

import Dropdown from "../../widgets/dropDown";
import { mockedData } from "../../constants";
import './mainInterface.css';


class MainInterface extends Component {
  constructor(props) {
    super(props)
    this.dropdownItems = mockedData.array
    this.dropdownGroups = mockedData.groups

    const selectedItemRegular =  this.dropdownItems[0]
    const selectedItemGrouped = _(this.dropdownGroups).values().flatten().first()
    this.state = {
      selectedItem: {
        regular: selectedItemRegular,
        grouped: selectedItemGrouped
      } 
    }
  }

  handleSelectRegular = (item, _index) => {
    this.setState(prevState => ({
      selectedItem: {
        ...prevState.selectedItem,
        regular: item
      }
    }))
  }

  handleSelectGrouped = (item, _index, _group) => {
    this.setState(prevState => ({
      selectedItem: {
        ...prevState.selectedItem,
        grouped: item
      }
    }))
  }

  render() {
    const { selectedItem } = this.state
    return (
      <div className="main-container">
        <div className="sub-container">
          <Info text="Regular Dropdown"/>
          <Dropdown
            data={this.dropdownItems}
            disabledItems={[5]} // hardcoded
            selected={selectedItem.regular}
            onSelect={this.handleSelectRegular}
          />
        </div>
        <div className="sub-container">
          <Info text="Grouped Dropdown"/>
          <Dropdown
            data={this.dropdownGroups}
            disabledItems={{
              "Group 2": [2]
            }}  // hardcoded
            selected={selectedItem.grouped}
            onSelect={this.handleSelectGrouped}
          />
        </div>
      </div>
    );
  }
}

export default MainInterface;


const Info = ({ text }) => (<div>{text}</div>)