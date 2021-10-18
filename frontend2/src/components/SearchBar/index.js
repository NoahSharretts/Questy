import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./SearchBar.css"

function SearchBar() {
  const history = useHistory();


  return (
    <div className='search'>
      <input type='test' placeholder='Search a question...'/>
    </div>
  )
}

export default SearchBar;
