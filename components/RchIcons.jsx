/// Copyright (c) Pascal Brand
/// MIT License
///
/// Can be used with
///    { RchIcon['dropdown'][true] }
/// to render the dropdown icon, when the dropdown is opened (true)


// search for icons at https://react-icons.github.io/react-icons/
import { SlMagnifier } from "react-icons/sl";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"

const RchIcons = {
  dropdown: {
    true: <AiFillCaretUp />,
  false: <AiFillCaretDown />,
  },
  searchbar: {
    true: <SlMagnifier />,
    false: <SlMagnifier />,
  }
}

export { RchIcons }
