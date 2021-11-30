import React from "react";
export const SubmitButton = (props) => {
  const { onclick } = props;
  function handleOnClick(e) {
    e.preventDefault();
    onclick();
  }

  return (
    <button className="submit-button normal-button" onClick={handleOnClick}>
      {props.children}
    </button>
  );
};
export const AddButton = (props) => {
  const { onclick } = props;
  function handleOnClick(e) {
    e.preventDefault();
    onclick();
  }

  return (
    <button className="add-button normal-button" onClick={handleOnClick}>
      {props.children}
    </button>
  );
};
export const DangerButton = (props) => {
  const { onclick } = props;
  function handleOnClick(e) {
    e.preventDefault();
    onclick();
  }

  return (
    <button className="danger-button normal-button" onClick={handleOnClick}>
      {props.children}
    </button>
  );
};
export const CircleAddButton = (props) => {
  const { onclick } = props;
  function handleOnClick(e) {
    e.preventDefault();
    onclick();
  }

  return (
    <button className="circle-button circle-add-button" onClick={handleOnClick}>
      {props.children}
    </button>
  );
};
export const CircleDangerButton = (props) => {
  const { onclick } = props;
  function handleOnClick(e) {
    e.preventDefault();
    onclick();
  }

  return (
    <button
      className="circle-button circle-danger-button"
      onClick={handleOnClick}
    >
      {props.children}
    </button>
  );
};
