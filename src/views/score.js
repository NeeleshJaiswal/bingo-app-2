import React, { useContext, useEffect, useState } from "react";
import { WinnerContext } from "../context/winner.context";
import ConfettiComponent from "./confetti";


function Score() {
  const { winner } = useContext(WinnerContext);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    winner.length * 2 > score && setConfetti(true);
    confetti && setTimeout(() => {setConfetti(false);}, 1000);
    setScore(winner.length * 2);
    
  }, [winner]);

  return (
    <div>
      <h5>YOUR SCORE IS {score}</h5>
      {confetti && <ConfettiComponent />}
    </div>
  );
}

export default Score;
