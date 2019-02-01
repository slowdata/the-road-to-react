import React from "react";

import Button from "./Button";

// Inline Styles used in component
const largeColumn = {
  width: "40%"
};
const mediumColumn = {
  width: "30%"
};
const smallColumn = {
  width: "10%"
};

const Table = ({ result, onDismiss }) => {
  if (!result) {
    return null;
  }
  return (
    <div className="table">
      {result.map(item => (
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={mediumColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span style={smallColumn}>
            <Button
              className="button-inline"
              onClick={() => onDismiss(item.objectID)}
            >
              Dismis
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Table;
