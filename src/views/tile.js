import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { WinnerContext } from "../context/winner.context";

function Tile({ id, children, onToggle, isSet }) {
  const { winner } = useContext(WinnerContext);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (winner.includes(parseInt(id))) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [winner]);

  return (
    <div
      onClick={onToggle}
      className={clsx(
        `tile ${isSet ? "tile--set" : ""}`,
        flag && "highlighted"
      )}
    >
      {children}
    </div>
  );
}

export default Tile;
