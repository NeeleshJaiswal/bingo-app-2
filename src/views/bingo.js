import React, { useContext, useEffect, useState } from 'react'
import shuffle from "shuffle-array";
import { WinnerContext } from '../context/winner.context';
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

      const isWon = checked => {
        const range = [0, 1, 2, 3, 4];
        return (
          undefined !==
            range.find(row => range.every(column => checked[row * 5 + column])) ||
          undefined !==
            range.find(column => range.every(row => checked[row * 5 + column])) ||
          range.every(index => checked[index * 5 + index]) ||
          range.every(index => checked[index * 5 + 4 - index])
        );
      };
 
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
      <h1>Bingo</h1>
      <Score/>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
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
      {/* {state.won ? <Confetti /> : null} */}

      <button className='reset-button' onClick={handleClick}>Reset Game</button>
    </div>
  );
}

export default Bingo
