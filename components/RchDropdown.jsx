/// Copyright (c) Pascal Brand
/// MIT License
///
///
/// TODO: click on arrow to close/open dropdown
/// TODO: keyboard arrow to select in the dropdown list
///

import { useState } from "react";
import './RchDropdown.scss'

// icons
// search for icons at https://react-icons.github.io/react-icons/
import { SlMagnifier } from "react-icons/sl";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"

function Icon({type}) {
  return (
    <>
      {(type === 'dropdown') && (open ? <AiFillCaretUp /> : <AiFillCaretDown />)}
      {(type === 'searchbar') && <SlMagnifier />}
    </>
  )
}

const RchDropdown = (
  {
    type,               // type of dropdown: dropdown, or searchbar
    initialValue,       // initial value of the box
    list,               // list of items to be shown in the dropdown when opened, or in the searchbar when guessing
    valueFromItem,      // how the item is printed
    onChange,
    onSelect,           // (index, item) function, called when an item is selected from the dropdown
    maxNbInCol=-1       // max number elements in a colum
  }
) => {
  // whether or not a list is shown below the button
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open)

  // value shown in in the button
  const [value, setValue] = useState(initialValue);

  // function raised when an item from the list is selected
  const selectItem = ({ index, item }) => {
    setOpen(false);                           // close the dropdown or the guesses
    setValue(valueFromItem(item));            // set the new value to display in the button
    onSelect({ index: index, item: item });  // call the external callback for action with this selection
  }

  function onKeyUp({key}) {
    if (key === "Enter") {
      if (list && open && type==='searchbar') {
        selectItem({ index: 0, item: list[0] })
      }
    } else if (key === "Escape") {
      setOpen(false)
    }
  }

  let styleColumns = {}
  if (list && maxNbInCol!==-1) {
    const value = Math.floor(list.length / maxNbInCol) + 1
    styleColumns = { columns: value.toString() }
  }

  return (
    <div className="rch-dropdown">
      <div className="rch-dropdown__top">
        {(type === 'dropdown') &&
          <button className="rch-dropdown__top-toclick" 
            onClick={toggleOpen} 
            onKeyUp={onKeyUp} 
          >
              {value} 
          </button>}

        {(type === 'searchbar') &&
          <input
            className="rch-dropdown__top-toclick"
            type="text"
            value={value}
            onChange={(e) => { setOpen(true); setValue(e.target.value); onChange(e.target.value); }}
            onFocus={(e) => { setOpen(true); setValue(e.target.value); onChange(e.target.value); }}
            onKeyUp={onKeyUp}
            //onBlur={closeOpen}    // react version of onfocusout
          />
        }

        <Icon type={type}/>
      </div>

      {(list && open) ? (
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
