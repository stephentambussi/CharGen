import './App.css';
import React from 'react';
import logo from './logo.svg';
//import { Route, Routes, Link } from 'react-router-dom';
//import MainPage from './MainPage';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://react.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      /* Keep this for now as it shows how to add navigation tabs
      <div className="App">
        <div>
          <nav>
            <ul id="navigation">
              <li>
                <Link to="/">Character Template</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
      */
    );
  }
}

export default App;
