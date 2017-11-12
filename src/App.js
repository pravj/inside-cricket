import React, { Component } from 'react';
import RandomTeamTable from './componenets/RandomTeam'
// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import './skeleton.min.css';

class App extends Component {
  render() {
    return (
      <div className="ic">
        <header className="ic-header">
          <h1 className="ic-title">Inside Cricket</h1>
          <p>A fifth umpire' view of your favorite sport</p>
          <p className="ic-author"><a href="https://twitter.com/hackpravj" target="_blank">Pravendra Singh</a></p>
        </header>
        <p className="ic-intro">
          Cricket is the most popular game in my country.
        </p>

        <div>
          <RandomTeamTable/>
        </div>
      </div>
    );
  }
}

export default App;
