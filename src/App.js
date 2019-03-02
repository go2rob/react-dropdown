import React, { Component } from 'react';
import './App.css';
import MainInterface from "./containers/mainInterface"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MainInterface/>
        </header>
      </div>
    );
  }
}

export default App;
