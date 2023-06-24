import React from "react";
import "./index.css";

const Header = (props) => {
  const searchUpdate = (e) => {
    const searchValue = e.target.value;
    props.onSearch(searchValue);
  };

  return (
    <header className="app-header">
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Start typing"
          value={props.searchText}
          onChange={searchUpdate}
        />
      </aside>
    </header>
  );
};

export default Header;
