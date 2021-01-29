import logo from './logo.svg';
import './App.css';
import Name from './Components/Name';
import Surname from './Components/Surname';
import Age from './Components/Age';
import Country from './Components/Country';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Name />
        <Surname />
        <Age />
        <Country />
      </header>
    </div>
  );
}

export default App;
