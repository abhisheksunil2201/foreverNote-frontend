import React from "react";
import { useHistory } from "react-router-dom";
import { randomPatterns, randomPatternGenerator } from "../helper";

const NotebookCover = ({ notebook, index }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/notebooks/${notebook.title}`);
  };
  return (
    <div
      className="notebook"
      style={{
        backgroundImage: `url(${
          randomPatterns[randomPatternGenerator(index)]
        })`,
      }}
      onClick={handleClick}
    >
      <div className="notebook__details">
        <p>{notebook.title}</p>
      </div>
    </div>
  );
};

export default NotebookCover;
