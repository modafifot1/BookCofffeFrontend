import React from "react";
export const MutedLink = (props) => {
  const { href } = props;
  return (
    <a href={href} className="common-link muted-link-styles">
      {props.children}
    </a>
  );
};

export const BoldLink = (props) => {
  const { href } = props;
  return (
    <a href={href} className="common-link bold-link-styles">
      {props.children}
    </a>
  );
};
