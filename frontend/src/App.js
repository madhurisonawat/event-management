import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import RouteNav from './Components/RouteNav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="App">
      <Navbar/>
      <RouteNav/>
    </div>
  );
}

export default App;
