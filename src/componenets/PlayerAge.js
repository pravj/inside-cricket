import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

// player's age distribution
const playerAge = [
  {age: 16, count: 5},
  {age: 17, count: 8},
  {age: 18, count: 22},
  {age: 19, count: 32},
  {age: 20, count: 58},
  {age: 21, count: 46},
  {age: 22, count: 42},
  {age: 23, count: 39},
  {age: 24, count: 25},
  {age: 25, count: 14},
  {age: 26, count: 10},
  {age: 27, count: 4},
  {age: 28, count: 2},
  {age: 30, count: 1},
  {age: 31, count: 1},
  {age: 33, count: 1},
];

class PlayerAge extends Component {
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

  componentDidMount() {
    const padding = {};
    let isSmallDevice = false;

    const pageWidth = (window.innerWidth || document.body.clientWidth);
    if (pageWidth > 980) {
      padding.left = (pageWidth * 20) / 100;
      padding.right = (pageWidth * 20) / 100;
    } else {
      padding.left = (pageWidth * 5) / 100;
      padding.right = (pageWidth * 5) / 100;

      isSmallDevice = true;
    }

    const width = pageWidth - (2 * padding.left);
    const height = width * 0.75;

    const innerPadding = {
      left: 40,
      right: 40,
      bottom: 10,
    };

    // create an svg container
    const vis = d3.select(".ic-player-age").append("svg:svg")
        .attr("width", width)
        .attr("height", height + innerPadding.bottom);

    // define the y scale (vertical)
    const yScale = d3.scaleLinear()
        .domain([0, 63])
        .range([height - innerPadding.bottom, 0]);

    // dataset
    const data = playerAge;

    // define the x scale (time)
    const xScale = d3.scaleLinear()
        .domain([15, 35])
        .range([innerPadding.left, width - innerPadding.right])

    // define the x axis
    const xAxis = d3.axisBottom(xScale);

    // append the x axis
    vis.append("g")
        .attr("transform", "translate(0,"+ (height - innerPadding.bottom) +")")
        .call(xAxis);

    const tip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return "" + d.count + " player" + (d.count > 1 ? "s" : "") + " started playing in the age of " + d.age;
    });

    tip.direction(function(d) {
      return 'n';
    });

    vis.call(tip);

    // histogram bars
    vis.selectAll(".player-age-hist")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return xScale(d.age - 0.35); })
        .attr("y", function(d) { return yScale(d.count); })
        .attr("width", isSmallDevice ? 10 : 25)
        .attr("height", function(d) { return (yScale(0) - yScale(d.count)); })
        .attr("fill", "#6B7FD7")
        .attr("fill-opacity", function (d) {
          return d.age >= 28 ? "0.9" : "0.3"
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    // player count text label
    for (let i = 0; i < playerAge.length; i++) {
      vis.append("text")
          .attr("x", xScale(playerAge[i].age - 0.35))
          .attr("dx", isSmallDevice ? 2 : 5)
          .attr("y", yScale(playerAge[i].count))
          .attr("dy", -5)
          .attr("font-size", isSmallDevice ? '8px' : '12px')
          .text(playerAge[i].count);
    }

    // ruler legend
    vis.append("text")
        .attr("x", width - 2 * innerPadding.left)
        .attr("y", "80%")
        .style('text-anchor', 'middle')
        .attr("font-size", isSmallDevice ? '10px' : '12px')
        .text('Debut age ⟶');

    // create an svg container for title
    const titleVis = d3.select(".ic-player-age-title").append("svg:svg")
        .attr("width", width)
        .attr("height", 40);

    titleVis.append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .style('text-anchor', 'middle')
        .attr("font-size", isSmallDevice ? '12px' : '15px')
        .text('"Age distribution of successful cricket players"');

    // create an svg container for late comers table
    const lateComersVis = d3.select(".ic-late-comers").append("svg:svg")
        .attr("width", width)
        .attr("height", 40);

    lateComersVis.append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .style('text-anchor', 'middle')
        .attr("font-size", isSmallDevice ? '12px' : '15px')
        .text('"Late debuts in cricket" (age in years)');

    // create an svg container for late comers table
    const earlyComersVis = d3.select(".ic-early-comers").append("svg:svg")
        .attr("width", width)
        .attr("height", 40);

    earlyComersVis.append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .style('text-anchor', 'middle')
        .attr("font-size", isSmallDevice ? '12px' : '15px')
        .text('"Early debuts in cricket" (age in years)');
  }

  render() {
    const lateComerplayers = [
      {name: 'Clarrie Grimmett', team: 'AUS', age: '33', url: ''},
      {name: 'Imran Tahir', team: 'SA', age: '31', url: ''},
      {name: 'Saeed Ajmal', team: 'PAK', age: '30', url: ''},
      {name: 'Michael Hussey', team: 'AUS', age: '28', url: ''},
      {name: 'Jonathan Trott', team: 'ENG', age: '28', url: ''},
    ];

    const earlyComerplayers = [
      {name: 'Aaqib Javed', team: 'PAK', age: '16', url: ''},
      {name: 'SR Tendulkar', team: 'IND', age: '16', url: ''},
      {name: 'Shahid Afridi', team: 'PAK', age: '16', url: ''},
      {name: 'Mohammad Ashraful', team: 'BAN', age: '16', url: ''},
      {name: 'Abdul Razzaq', team: 'PAK', age: '16', url: ''},
    ];

    const latePlayerList = lateComerplayers.map((player, index) => (
        <div key={index} className="ic-table-container-item"><img style={{ paddingRight: '20px', position: 'relative', top: '2px' }} src={PlayerAge.flagURL(player.team)}/>({player.age}) <a target="_blank" href={'https://www.google.com/search?q=Cricketer ' + player.name}>{player.name}</a></div>
    ));

    const earlyPlayerList = earlyComerplayers.map((player, index) => (
        <div key={index} className="ic-table-container-item"><img style={{ paddingRight: '20px', position: 'relative', top: '2px' }} src={PlayerAge.flagURL(player.team)}/>({player.age}) <a target="_blank" href={'https://www.google.com/search?q=Cricketer ' + player.name}>{player.name}</a></div>
    ));

    return (
        <div>
          <div className="ic-player-age-title" />
          <div className="ic-player-age" />
          <p className="ic-intro">
            The distribution suggests that the majority of players start their international career in the age of 20, but there have been a few famous players who started playing late.
          </p>
          <div className="ic-late-comers" />
          <div className="ic-table-container">
            {latePlayerList}
          </div>
          <p className="ic-intro">
            You can see Michael Hussey in the list here, who started late but ended up being the core of Australian batting lineup.
          </p>
          <div className="ic-early-comers" />
          <div className="ic-table-container">
            {earlyPlayerList}
          </div>
          <p className="ic-intro">
            On the other hand, Sachin and Afridi started their career way early. No wonder Sachin was able to play for 24 long years and score all those runs.
          </p>
        </div>
    );
  }
}

export default PlayerAge;