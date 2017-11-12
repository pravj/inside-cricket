import React, { Component } from 'react';

// TODO: Show the ICC 2016 team on render

const topOrderPlayers = [
  {name: 'Sachin Tendulkar', team: 'IND'},
  {name: 'Chris Gayle', team: 'WI'},
  {name: 'Brian Lara', team: 'WI'},
  {name: 'Jacques Kallis', team: 'SA'},
  {name: 'Virender Sehwag', team: 'IND'},
  {name: 'Rahul Dravid', team: 'IND'},
  {name: 'Kevin Pietersen', team: 'ENG'},
  {name: 'Andrew Symonds', team: 'AUS'},
  {name: 'Inzamam-ul-Haq', team: 'PAK'},
  {name: 'Yuvraj Singh', team: 'IND'},
  {name: 'Michael Hussey', team: 'AUS'},
  {name: 'Matthew Hayden', team: 'AUS'},
  {name: 'Shivnarine Chanderpaul', team: 'WI'},
  {name: 'Herschelle Gibbs', team: 'SA'},
  {name: 'Farveez Maharoof', team: 'SL'},
  {name: 'Martin Guptill', team: 'NZ'},
  {name: 'TM Dilshan', team: 'SL'},
  {name: 'Shane Watson', team: 'AUS'},
  {name: 'AB de Villiers', team: 'SA'},
  {name: 'Paul Collingwood', team: 'ENG'},
  {name: 'Gautam Gambhir', team: 'IND'},
  {name: 'Alastair Cook', team: 'ENG'},
  {name: 'Shahid Afridi', team: 'PAK'},
  {name: 'Michael Clarke', team: 'AUS'},
  {name: 'Hashim Amla', team: 'SA'},
  {name: 'Shikhar Dhawan', team: 'IND'},
  {name: 'Ravindra Jadeja', team: 'IND'},
  {name: 'Mohammad Hafeez', team: 'PAK'},
  {name: 'George Bailey', team: 'AUS'},
  {name: 'Dwayne Bravo', team: 'WI'},
  {name: 'Steve Smith', team: 'AUS'},
  {name: 'Ross Taylor', team: 'NZ'},
  {name: 'David Warner', team: 'AUS'},
  {name: 'Jos Buttler', team: 'ENG'},
  {name: 'Mitchell Marsh', team: 'AUS'}
]

const lowerOrderPlayers = [
  {name: 'Andrew Flintoff', team: 'ENG'},
  {name: 'Shaun Pollock', team: 'SA'},
  {name: 'Chaminda Vaas', team: 'SL'},
  {name: 'Jason Gillespie', team: 'AUS'},
  {name: 'Daniel Vettori', team: 'NZ'},
  {name: 'Brett Lee', team: 'AUS'},
  {name: 'Naved-ul-Hasan', team: 'PAK'},
  {name: 'Glenn McGrath', team: 'AUS'},
  {name: 'Irfan Pathan', team: 'IND'},
  {name: 'Shane Bond', team: 'NZ'},
  {name: 'Muttiah Muralitharan', team: 'SL'},
  {name: 'Mitchell Johnson', team: 'AUS'},
  {name: 'Nathan Bracken', team: 'AUS'},
  {name: 'Nuwan Kulasekara', team: 'SL'},
  {name: 'Ajantha Mendis', team: 'SL'},
  {name: 'Umar Gul', team: 'PAK'},
  {name: 'Stuart Broad', team: 'ENG'},
  {name: 'Doug Bollinger', team: 'AUS'},
  {name: 'Ryan Harris', team: 'AUS'},
  {name: 'Dale Steyn', team: 'SA'},
  {name: 'Graeme Swann', team: 'ENG'},
  {name: 'Zaheer Khan', team: 'IND'},
  {name: 'Morne Morkel', team: 'SA'},
  {name: 'Steven Finn', team: 'ENG'},
  {name: 'Lasith Malinga', team: 'SL'},
  {name: 'Saeed Ajmal', team: 'PAK'},
  {name: 'Mitchell Starc', team: 'AUS'},
  {name: 'James Anderson', team: 'ENG'},
  {name: 'James Faulkner', team: 'AUS'},
  {name: 'Mohammed Shami', team: 'IND'},
  {name: 'Mustafizur Rahman', team: 'BAN'},
  {name: 'Imran Tahir', team: 'SA'},
  {name: 'Kagiso Rabada', team: 'SA'},
  {name: 'Sunil Narine', team: 'WI'},
  {name: 'Trent Boult', team: 'NZ'},
]

class RandomTeamTable extends Component {
  // Randomize array element order in-place
  // Using Durstenfeld shuffle algorithm
  // https://stackoverflow.com/a/12646864/2947248
  static shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  static flagURL(country) {
    switch (country) {
      case 'IND':
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png'
      case 'SL':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/23px-Flag_of_Sri_Lanka.svg.png'
      case 'AUS':
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/23px-Flag_of_Australia.svg.png'
      case 'WI':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/WestIndiesCricketFlagPre1999.svg/23px-WestIndiesCricketFlagPre1999.svg.png'
      case 'NZ':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/23px-Flag_of_New_Zealand.svg.png'
      case 'PAK':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/23px-Flag_of_Pakistan.svg.png'
      case 'SA':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/23px-Flag_of_South_Africa.svg.png'
      case 'ENG':
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/23px-Flag_of_England.svg.png'
      case 'BAN':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/23px-Flag_of_Bangladesh.svg.png'
      default:
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/23px-Flag_of_Australia.png'
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      players: [],
    }

    this.buttonClick = this.buttonClick.bind(this)
  }

  buttonClick() {
    // wicket keepers in the list
    const wicketKeeperPlayersODI = [
      {name: 'Adam Gilchrist', team: 'AUS'},
      {name: 'Mark Boucher', team: 'SA'},
      {name: 'MS Dhoni', team: 'IND'},
      {name: 'Kumar Sangakkara', team: 'SL'},
      {name: 'Quinton de Kock', team: 'SA'},
    ]

    // captains in the list
    const captainPlayers = [
      {name: 'Ricky Ponting', team: 'AUS'},
      {name: 'Marvan Atapattu', team: 'SL'},
      {name: 'MS Dhoni', team: 'IND'},
      {name: 'AB de Villiers', team: 'SA'},
      {name: 'Virat Kohli', team: 'IND'},
      {name: 'Mahela Jayawardene', team: 'SL'},
    ]

    let players = []
    let cap = captainPlayers[Math.floor(Math.random()*captainPlayers.length)]
    let wk = wicketKeeperPlayersODI[Math.floor(Math.random()*wicketKeeperPlayersODI.length)]

    // MS Dhoni: The real MVP
    if (cap.name === wk.name) {
      cap.tag = '(c/wk)'
      players.push(cap)
    } else {
      // add captain
      cap.tag = '(c)'
      players.push(cap)
      // add wicket keeper
      wk.tag = '(wk)'
      players.push(wk)
    }

    // add top order players
    RandomTeamTable.shuffleArray(topOrderPlayers)
    const topPlayerNumber = (players.length === 1 ? 6 : 5);
    for (let i = 0; i < topPlayerNumber; i++) {
      players.push(topOrderPlayers[i])
    }

    // add 4 lower order players
    RandomTeamTable.shuffleArray(lowerOrderPlayers)
    for (let i = 0; i < 4; i++) {
      players.push(lowerOrderPlayers[i])
    }

    // update the player list
    this.setState({
      players: players,
    })
  }

  render() {
    const playerList = this.state.players.map((player) => (
        <div key={player.name} className="ic-table-container-item"><img style={{ paddingRight: '20px', position: 'relative', top: '2px' }} src={RandomTeamTable.flagURL(player.team)}/>{player.name} {player.tag ? player.tag : ''}</div>
    ));

    return (
        <div className="ic-table-button">
          <button className="button-primary" onClick={this.buttonClick}>Generate Team</button>
          <div className="ic-table-container">{playerList}</div>
        </div>
    );
  }
}

export default RandomTeamTable;