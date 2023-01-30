/// Copyright (c) Pascal Brand
/// MIT License
///
///
/// TODO: keyboard arrow to select in the dropdown list
///

import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import './RchDropdown.scss'
import { RchIcons } from "./RchIcons";


const RchDropdown = (
  {
    type,               // type of dropdown: dropdown, or searchbar
    initialValue,       // initial value of the box
    list,               // list of items to be shown in the dropdown when opened, or in the searchbar when guessing
    valueFromItem,      // how the item is printed
    onChange,
    onSelect,           // ({ index, item }) function, called when an item is selected from the dropdown
    maxNbInCol=-1       // max number elements in a colum
  }
) => {

  // whether or not a list is shown below the button
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen)
  const updateIsOpen = (newState) => { if (isOpen != newState) { setIsOpen(newState); }}
  const dropdownRef = useRef(null)

  // value shown in in the button
  const [value, setValue] = useState(initialValue);

  // function raised when an item from the list is selected
  const selectItem = ({ index, item }) => {
    updateIsOpen(false);                      // close the dropdown or the guesses
    setValue(valueFromItem(item));            // set the new value to display in the button
    onSelect({ index: index, item: item });   // call the external callback for action with this selection
  }

  function onKeyUp({key}) {
    if (key === "Enter") {
      if (list && isOpen && type==='searchbar') {
        selectItem({ index: 0, item: list[0] })
      }
    } else if (key === "Escape") {
      updateIsOpen(false);
    }
  }

  function handleClick(e) {
    // check if we click outside this dropdown button
    // in this case, we close it
    for (let parent = e.target.parentNode; parent !== null; parent = parent.parentNode) {
      if (parent === dropdownRef.current) {
        return;   // do not close as the clicked div is a child of this dropdown button
      }
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      addEventListener('click', handleClick);
      return () => window.removeEventListener("click", handleClick);    // remove this event listener when isOpen is modified
                                                                        // so when it is closed, there is no event handler
    }
  }, [isOpen])

  let styleColumns = {}
  if (list && maxNbInCol!==-1) {
    const value = Math.floor(list.length / maxNbInCol) + 1
    styleColumns = { columns: value.toString() }
  }

  return (
    <div ref={dropdownRef} className="rch-dropdown" onClick={toggleIsOpen} onKeyUp={onKeyUp} >
      <div className="rch-dropdown__top">
        {(type === 'dropdown') &&
          <button className="rch-dropdown__top-toclick">
              {value} 
          </button>}

        {(type === 'searchbar') &&
          <input
            className="rch-dropdown__top-toclick"
            type="text"
            value={value}
            onChange={(e) => { updateIsOpen(true); setValue(e.target.value); onChange(e.target.value); }}
            onFocus={(e) => { updateIsOpen(true); setValue(e.target.value); onChange(e.target.value); }}
          />
        }

        { RchIcons[type][isOpen] }
      </div>

      {(list && isOpen) ? (
        <ul className="rch-dropdown__list" style={styleColumns}>
          {list.map((item, index) => (
            <li key={index} className="rch-dropdown__list-item">
              <button className="rch-dropdown__list-item" onClick={() => selectItem({ index: index, item: item })}>
                {valueFromItem(item)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default RchDropdown;

RchDropdown.propTypes = {
  type: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  list: PropTypes.array,
  valueFromItem: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  maxNbInCol: PropTypes.number
}
