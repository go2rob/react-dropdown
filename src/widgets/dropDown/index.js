import React, { Component } from 'react';
import './dropDown.css';
import PropTypes from "prop-types" 
import _ from "lodash";

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: this.getSelectedValue(),
      isExpanded: false,
      focusedIndex: -1
      // TODO: change to false
    }
  }

  getSelectedValue = () => {
    return this.props.selected || this.props.data[0]
  }

  handleClick = () => {
    this.setState(prevState => ({
      ...prevState,
      isExpanded: !prevState.isExpanded
    }))
  }

  handleMouseEnter = index => {
    this.setState(prevState => ({
      ...prevState,
      focusedIndex: index
    }))
  }

  handleMouseLeave = () => {
    this.setState(prevState => ({
      ...prevState,
      focusedIndex: -1
    }))
  }

  handleItemSelect = () => {
    const { focusedIndex } = this.state
    const item = this.props.data[focusedIndex]
    this.handleClick()
    this.props.onSelect(item, focusedIndex)
  }

  render() {
    return (
      <div className="dropdown-main">
        <div
          className="dropdown-display"
          onClick={this.handleClick}
        >
          <span>{this.getSelectedValue()}</span>
        </div>
        <DropDownContainer
          { ...this.props }
          { ...this.state }
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave}
          handleItemSelect={this.handleItemSelect}
        />
      </div>
    );
  }
}

export default Dropdown;


Dropdown.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

const DropDownContainer = ({ data, onSelect, handleItemSelect, isExpanded, focusedIndex, handleMouseEnter, handleMouseLeave }) => {
  if (!isExpanded) {
    return null;
  }
  return (
    <div className="dropdown-container">
      {
        _.map(data, (item, index) => {
          const isFocused = focusedIndex===index
          return (
            <div
              key={index}
              className={isFocused ? "dropdown-item-focused" :"dropdown-item"}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              // onClick={() => onSelect(item, index)}
              onClick={handleItemSelect}
            >
              <span>
                {item}
              </span>
            </div>
          )
        })
      }     
    </div>
  )
}