import './App.css';
import Card from './components/Card';
import Blob from './components/Blob';
import Navbar from './components/Navbar';
import { useState } from 'react';
function App() {

  const [theme, setTheme] = useState("dark");
  const toogleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  return (
    <div className="App" id={theme}>
      <div className='mainWrap'>
        <Navbar toogleTheme={toogleTheme} />
        <Blob />
        <div className='cardWrap'>
          <Card title="1. aot" />
          <Card title="2. aot" />
        </div>
      </div>
    </div>
  );
}

export default App;
