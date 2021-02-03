import React, { useContext, useEffect, useState } from 'react'
import shuffle from "shuffle-array";
import { WinnerContext } from '../context/winner.context';
import { isWon } from '../services/winner-services';
import { dataArray, lines } from '../utilities/data-util';

import Score from './score';
import Tile from './tile';

function Bingo() {
    const [state, setState] = useState({ checked: {} });
    const { setWinner } = useContext(WinnerContext);
    const [data, setData] = useState(() => {
        return shuffle(dataArray).reduce(
            (data, value, index) => ({ ...data, [index]: value }),
            {}
          );
    })

    useEffect(() => {
        let newArr = [];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c, d, e] = lines[i];
          if (
            state.checked[a] &&
            state.checked[b] &&
            state.checked[c] &&
            state.checked[d] &&
            state.checked[e]
          ) {
            newArr.push(a, b, c, d, e);
          }
        }
        setWinner(newArr);
      }, [state.checked]);
 
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

    const handleClick = () => {
        setState({ checked: {} });
        setWinner([]);
        let newData = shuffle(dataArray).reduce(
            (data, value, index) => ({ ...data, [index]: value }),
            {}
          );
        setData(newData)
    }

  return (
    <div className="bingo">
      <h1>Tech Bingo</h1>
      <Score/>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          
          id < 25 && <Tile
            data={data}
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile> 
        ))}
      </div>

      <button className='reset-button' onClick={handleClick}>Reset Game</button>
    </div>
  );
}

export default Bingo
