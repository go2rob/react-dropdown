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
      focusedIndex: -1,
      focusedGroup: ""
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

  handleMouseEnter = params => {
    const { index, group } = params
    this.setState(prevState => {
      const focusedIndex =  params.hasOwnProperty("index") ? index : prevState.focusedIndex
      const focusedGroup =  params.hasOwnProperty("group") ? group : prevState.focusedGroup
      return {
        ...prevState,
        focusedIndex,
        focusedGroup
      }
    })
  }

  handleMouseLeave = ({ group }) => {
    this.setState(prevState => {
      const focusedGroup = group ? "" : prevState.focusedGroup
      return {
        ...prevState,
        focusedIndex: -1,
        focusedGroup
      }
    })
  }

  handleItemSelect = () => {
    const { focusedIndex, focusedGroup } = this.state
    const item = focusedGroup===""
      ? this.props.data[focusedIndex]
      : this.props.data[focusedGroup][focusedIndex]    
    this.handleClick()
    this.props.onSelect(item, focusedIndex, focusedGroup)
  }

  render() {
    return (
      <div className="dropdown-main">
        <div
          className="dropdown-display"
          onClick={this.handleClick}
        >
          <span>{this.getSelectedValue()}</span>
          <Chevron isExpanded={this.state.isExpanded}/>
        </div>
        <DropDownContainer
          { ...this.props }
          { ...this.state }
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave}
          handleItemSelect={this.handleItemSelect}
          grouped={_.isPlainObject(this.props.data)}
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
  ]).isRequired,
  onSelect: PropTypes.func.isRequired,
  disabledItems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

const DropDownContainer = props => {
  const {
    grouped,
    data,
    isExpanded,
    handleMouseEnter,
    handleMouseLeave
  } = props;

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="dropdown-container">
      {
        grouped
          ? _.map(data, (items, group) => {
              return (
                <div
                  key={group}
                  onMouseEnter={() => handleMouseEnter({ group })}
                  onMouseLeave={() => handleMouseLeave({ group })}
                >
                  <div className="dropdown-group-title">
                    <span>{group}</span>
                  </div>
                  <DropdownItems group={group} items={items} { ...props } />
                </div>
              )
            })
          : <DropdownItems items={data} { ...props }/>
      }
    </div>
  );
}

const DropdownItems = ({
  group,
  items,
  focusedIndex,
  focusedGroup,
  handleMouseEnter,
  handleMouseLeave,
  handleItemSelect,
  disabledItems
}) => {
  const orderedItems = _.sortBy(items)
  return (
    _.map(orderedItems, (item, index) => {
      const isItemFocused = focusedIndex===index
      const isGroupFocused = focusedGroup===group
      const isFocused = group ? ( isGroupFocused && isItemFocused) : isItemFocused
      const isDisabled = disabledItems &&
        group
          ? _.includes(_.keys(disabledItems), group) && _.includes(disabledItems[group], index)
          : _.includes(disabledItems, index)

      const className = isDisabled
        ? "dropdown-item disabled"
        : isFocused
          ? "dropdown-item focused"
          : "dropdown-item"

      return isDisabled
        ? (
            <div key={index} className={ className }>
              <span>{item}</span>
            </div>
          )
        : (
            <div
              key={index}
              className={ className }
              onMouseEnter={() => handleMouseEnter({ index })}
              onMouseLeave={handleMouseLeave}
              onClick={handleItemSelect}
            >
              <span>
                {item}
              </span>
            </div>
          );
    })
  );
}

const Chevron = ({ isExpanded }) => {
  return isExpanded
    ? <span className="fa fa-chevron-up chevron"></span>
    : <span className="fa fa-chevron-down chevron"></span>
}