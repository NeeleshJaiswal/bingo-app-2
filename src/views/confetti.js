// import React, { useEffect } from 'react'
// import { start } from '../services/confetti-services';

// function Confetti() {
//     useEffect(() => {
//         start();
//       });
//       return <canvas id="canvas" />;
// }

// export default Confetti


import React from 'react'
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti'
 
function ConfettiComponent() {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}

export default ConfettiComponent
