import React, { Component } from 'react';
import Dropdown from "../../widgets/dropDown"
import { mockedData } from "../../constants"
import './mainInterface.css';


class MainInterface extends Component {
  constructor(props) {
    super(props)
    this.dropdownItems = mockedData.array
    this.state = {
      selectedItem: this.dropdownItems[0]
    }
  }

  handleSelect = (item, index) => {
    console.log(item, index);
    
    this.setState(_prevState => ({
      selectedItem: item
    }))
  }

  render() {
    return (
      <div className="main-container">
        <div className="sub-container">
          <Info text="Regular Dropdown"/>
          <Dropdown
            data={this.dropdownItems}
            selected={this.state.selectedItem}
            onSelect={this.handleSelect}
          />
        </div>
        {/* <div className="sub-container">
          <Info text="Grouped Dropdown"/>
          <Dropdown/>
        </div> */}
      </div>
    );
  }
}

export default MainInterface;


const Info = ({ text }) => (<div>{text}</div>)