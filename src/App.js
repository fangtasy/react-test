import React, { Component } from 'react';
import Questions from './component/questions'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-title">Welcome candidate</header>
        <div>
        <Questions />
        </div>
      </div>
    );
  }
}

export default App;
