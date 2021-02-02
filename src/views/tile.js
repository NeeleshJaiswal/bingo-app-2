import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { WinnerContext } from "../context/winner.context";

function Tile({ data, id, children, onToggle, isSet }) {
  const { winner } = useContext(WinnerContext);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (id === "12") {
      onToggle(id);
    }
  }, [id, data]);

  useEffect(() => {
    if (winner.includes(parseInt(id))) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [winner]);

  const handleClick = (id) => {

    if (id === "12") {
      return;
    }
    onToggle(id);
  };
  return (
    <div
      onClick={() => handleClick(id)}
      className={clsx(
        `tile ${isSet ? "tile--set" : ""}`,
        flag && "highlighted", id === '12' && 'free-slot'
      )}
    >
      {children}
    </div>
  );
}

export default Tile;
