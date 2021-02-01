import './App.css';
import Bingo from './views/bingo';
import { WinnerProvider } from './context/winner.context';

function App() {
  return (
    <div className="App">
      <WinnerProvider>
        <Bingo />
      </WinnerProvider>
    </div>
  );
}

export default App;
