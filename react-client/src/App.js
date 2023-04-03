import logo from './logo.svg';
import './App.css';
import axios from './utils/axios';

function App() {
  const onClickMe = () => {
    axios.get('//localhost:3000/project/list?size=10&current=1')
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src='//localhost:3000/project/list?size=10&current=1' className="App-logo" alt="logo" />
        <div onClick={onClickMe}>点我</div>
      </header>
    </div>
  );
}

export default App;
