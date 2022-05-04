import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CharChat from './CharChat';
import CharTemplate from './CharTemplate';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <div>
          <nav>
            <ul id="navigation">
              <li>
                <Link to="/">Character Template</Link>
              </li>
              <li>
                <Link to="/chat">Character Chat</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<CharTemplate />} />
          <Route path="/chat" element={<CharChat />} />
        </Routes>
      </div>
    );
  }
}

export default App;
