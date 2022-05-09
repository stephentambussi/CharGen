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
          <h1 class="Title">Character Generator Title</h1>
          <button type="download_btn">Download</button>
          <a href="https://github.com/stephentambussi/char-gen"><button type="gh_btn">Github</button></a>
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
