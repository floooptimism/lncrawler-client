import React, { useState } from 'react';
import style from './SearchBar.module.css';


function SearchBar({onChange, className, placeholder}) {
  const [input, setInput] = useState("");

  function onTextChange(event) {
    setInput(event.target.value);
    onChange && onChange(event.target.value.trim());
  }

  return (
    <div className={`${style.searchBarContainer} ${className}`}>
      <span>
        <svg
          className={style.Icon}
          height="24"
          width="24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
      </span>

      <input type="text" value={input} onChange={onTextChange} placeholder={placeholder || "PlaceHolde rhere"} className={style.searchBar} />
    </div>
  );
  
}

export default SearchBar;
 