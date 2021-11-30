import React, { useState } from "react";
import { Search } from "@material-ui/icons";
export const Input = (props) => {
  const { label, name, type, locked, onChangeValue, value, error, onFocus } =
    props;
  const [active, setActive] = useState(() => props.active || false);
  const fieldClassName = `field ${
    (locked ? active : active || value || error) && "active"
  } ${locked && !active && "locked"}`;
  return (
    <div className={fieldClassName}>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={label}
        onChange={onChangeValue}
        onFocus={() => {
          onFocus(name);
          !locked && setActive(true);
        }}
        onBlur={() => !locked && setActive(false)}
        id={name}
      />
      <label className={error && "error"}>{error || label}</label>
    </div>
  );
};
export const SearchInput = ({ onChange, onBlur }) => {
  return (
    <div className="search-input-container">
      <div className="search-icon">
        <Search></Search>
      </div>
      <input className="search-input"></input>
    </div>
  );
};
export const Select = ({ items }) => {
  return (
    <div className="select-container">
      <select classname="items">
        {items.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
    </div>
  );
};
