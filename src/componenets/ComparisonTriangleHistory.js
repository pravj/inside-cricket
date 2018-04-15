import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

// (Lost, Draw, Won)
const matchData = {
  "1900": [
    {team: 'Australia', code: 'AUS', won: 16, lost: 9, draw: 8},
    {team: 'England', code: 'ENG', won: 11, lost: 18, draw: 9},
    {team: 'South Africa', code: 'SA', won: 4, lost: 4, draw: 3},
  ],
  "1910": [
    {team: 'Australia', code: 'AUS', won: 7, lost: 6, draw: 3},
    {team: 'England', code: 'ENG', won: 14, lost: 4, draw: 3},
    {team: 'South Africa', code: 'SA', won: 4, lost: 15, draw: 2},
  ],
  "1920": [
    {team: 'Australia', code: 'AUS', won: 14, lost: 6, draw: 8},
    {team: 'England', code: 'ENG', won: 18, lost: 16, draw: 14},
    {team: 'South Africa', code: 'SA', won: 3, lost: 10, draw: 10},
    {team: 'West Indies', code: 'WI', won: 0, lost: 3, draw: 0},
  ],
  "1930": [
    {team: 'Australia', code: 'AUS', won: 22, lost: 10, draw: 7},
    {team: 'England', code: 'ENG', won: 23, lost: 14, draw: 35},
    {team: 'South Africa', code: 'SA', won: 4, lost: 10, draw: 13},
    {team: 'West Indies', code: 'WI', won: 4, lost: 9, draw: 6},
    {team: 'India', code: 'IND', won: 0, lost: 5, draw: 2},
    {team: 'New Zealand', code: 'NZ', won: 0, lost: 5, draw: 9},
  ],
  "1940": [
    {team: 'Australia', code: 'AUS', won: 14, lost: 0, draw: 4},
    {team: 'England', code: 'ENG', won: 6, lost: 9, draw: 17},
    {team: 'South Africa', code: 'SA', won: 0, lost: 7, draw: 5},
    {team: 'West Indies', code: 'WI', won: 3, lost: 0, draw: 6},
    {team: 'India', code: 'IND', won: 0, lost: 6, draw: 7},
    {team: 'New Zealand', code: 'NZ', won: 0, lost: 1, draw: 5},
  ],
  "1950": [
    {team: 'Australia', code: 'AUS', won: 29, lost: 12, draw: 16},
    {team: 'England', code: 'ENG', won: 39, lost: 22, draw: 22},
    {team: 'South Africa', code: 'SA', won: 12, lost: 15, draw: 8},
    {team: 'West Indies', code: 'WI', won: 18, lost: 17, draw: 13},
    {team: 'India', code: 'IND', won: 6, lost: 17, draw: 21},
    {team: 'New Zealand', code: 'NZ', won: 1, lost: 21, draw: 10},
    {team: 'Pakistan', code: 'PAK', won: 8, lost: 9, draw: 12},
  ],
  "1960": [
    {team: 'Australia', code: 'AUS', won: 23, lost: 14, draw: 29},
    {team: 'England', code: 'ENG', won: 32, lost: 15, draw: 53},
    {team: 'South Africa', code: 'SA', won: 7, lost: 8, draw: 16},
    {team: 'West Indies', code: 'WI', won: 18, lost: 13, draw: 17},
    {team: 'India', code: 'IND', won: 9, lost: 21, draw: 22},
    {team: 'New Zealand', code: 'NZ', won: 6, lost: 18, draw: 19},
    {team: 'Pakistan', code: 'PAK', won: 2, lost: 8, draw: 20},
  ],
  "1970": [
    {team: 'Australia', code: 'AUS', won: 30, lost: 29, draw: 24},
    {team: 'England', code: 'ENG', won: 33, lost: 21, draw: 41},
    {team: 'South Africa', code: 'SA', won: 4, lost: 0, draw: 0},
    {team: 'West Indies', code: 'WI', won: 18, lost: 15, draw: 30},
    {team: 'India', code: 'IND', won: 17, lost: 19, draw: 28},
    {team: 'New Zealand', code: 'NZ', won: 3, lost: 19, draw: 19},
    {team: 'Pakistan', code: 'PAK', won: 9, lost: 11, draw: 26},
  ],
  "1980": [
    {team: 'Australia', code: 'AUS', won: 27, lost: 31, draw: 38},
    {team: 'England', code: 'ENG', won: 20, lost: 39, draw: 45},
    {team: 'Sri Lanka', code: 'SL', won: 2, lost: 16, draw: 11},
    {team: 'West Indies', code: 'WI', won: 43, lost: 8, draw: 31},
    {team: 'India', code: 'IND', won: 11, lost: 21, draw: 48},
    {team: 'New Zealand', code: 'NZ', won: 17, lost: 15, draw: 27},
    {team: 'Pakistan', code: 'PAK', won: 23, lost: 13, draw: 44},
  ],
  "1990": [
    {team: 'Australia', code: 'AUS', won: 54, lost: 25, draw: 29},
    {team: 'England', code: 'ENG', won: 26, lost: 43, draw: 38},
    {team: 'Sri Lanka', code: 'SA', won: 14, lost: 22, draw: 31},
    {team: 'West Indies', code: 'WI', won: 30, lost: 28, draw: 23},
    {team: 'India', code: 'IND', won: 18, lost: 20, draw: 31},
    {team: 'New Zealand', code: 'NZ', won: 17, lost: 32, draw: 32},
    {team: 'Pakistan', code: 'PAK', won: 32, lost: 21, draw: 23},
    {team: 'South Africa', code: 'SA', won: 29, lost: 13, draw: 24},
    {team: 'Zimbabwe', code: 'SA', won: 3, lost: 19, draw: 17},
  ],
  "2000": [
    {team: 'Australia', code: 'AUS', won: 79, lost: 18, draw: 18},
    {team: 'England', code: 'ENG', won: 55, lost: 37, draw: 37},
    {team: 'Sri Lanka', code: 'SL', won: 44, lost: 31, draw: 21},
    {team: 'West Indies', code: 'WI', won: 18, lost: 59, draw: 31},
    {team: 'India', code: 'IND', won: 40, lost: 27, draw: 36},
    {team: 'New Zealand', code: 'NZ', won: 23, lost: 32, draw: 25},
    {team: 'Pakistan', code: 'PAK', won: 30, lost: 31, draw: 22},
    {team: 'South Africa', code: 'SA', won: 53, lost: 32, draw: 23},
    {team: 'Zimbabwe', code: 'ZIM', won: 5, lost: 30, draw: 9},
    {team: 'Bangladesh', code: 'BAN', won: 3, lost: 52, draw: 6},
  ],
  "2010": [
    {team: 'Australia', code: 'AUS', won: 48, lost: 33, draw: 14},
    {team: 'England', code: 'ENG', won: 45, lost: 38, draw: 21},
    {team: 'Sri Lanka', code: 'SL', won: 25, lost: 31, draw: 21},
    {team: 'West Indies', code: 'WI', won: 16, lost: 35, draw: 17},
    {team: 'India', code: 'IND', won: 43, lost: 24, draw: 21},
    {team: 'New Zealand', code: 'NZ', won: 25, lost: 27, draw: 18},
    {team: 'Pakistan', code: 'PAK', won: 28, lost: 29, draw: 11},
    {team: 'South Africa', code: 'SA', won: 41, lost: 18, draw: 20},
    {team: 'Zimbabwe', code: 'ZIM', won: 3, lost: 18, draw: 1},
    {team: 'Bangladesh', code: 'BAN', won: 7, lost: 28, draw: 10},
  ],
};

let isSmallDevice = false;
let intervalID = null;

class ComparisonTriangleHistory extends Component {
  static getTeamHistoryDescription(team) {
    switch (team) {
      case "Select Team":
        return "Select the team to see its test timeline";
      case "India":
        return "After joining the ICC in 1926, India was a weak team in the starting days.<br/>Relatively, most of their test matches had resulted in draws.<br/>But they have been moving towards more wins for the last 3 decades.<br/>India currently ranks #1 in ICC Test rankings.";
      case "Australia":
        return "Australians have been the real kings of the game for long time.<br/>Starting from Don Bradman to Steve Waugh and Ricky Ponting.<br/>1960's and 1980's was the most unsuccessful time for the team,<br/>after the loss of players like Dennis Lillee and Rod Marsh.";
      case "Pakistan":
        return "Pakistan started playing tests in 1952, and also won the 1992 world cup.<br/>1990's was the time when Pakistani fast bowlers were famous worldwide.<br/>The team seem to have lost momentum for the last 2 decades.";
      case "Bangladesh":
        return "Bangladesh started playing tests in the start of the century.<br/>With the slow progress, they are still considered a weak team in the game.";
      case "Zimbabwe":
        return "The tail-ending team have had a bad test career.<br/>They are supposedly shifting the focus towards T20s";
      case "Sri Lanka":
        return "2000's was the golden time for Sri Lankan test cricket,<br/>with the likes of Jayasuriya, Sangakkara and Muralitharan.";
      case "New Zealand":
        return "New Zealand have been playing the game for a long time.<br/>But they have never had more relative wins in a year.";
      case "South Africa":
        return "Being the founding member of ICC, South Africa was banned from cricket in 1970's<br/>At that time, they were arguably the best team in thw world.";
      case "England":
        return "Inventors of cricket, England have been on all the sides of the game.<br/>Being the champions in the early and middle of 19th century.<br/>They have also been on the lower side of the game in the 1980's and 1990's.";
      case "West Indies":
        return "The Windies were known for their attacking fast bowling.<br/>They were the ultimate dominating team in 1970-80.<br/>Team's performance has since fallen in test cricket.";
      default:
        return team;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      team: "Select Team",
    };

    this.onTeamChange = this.onTeamChange.bind(this);

    this.vis = null;
    this.coord = null;
    this.padding = null;
  }

  componentDidMount() {
    const padding = {};

    const pageWidth = (window.innerWidth || document.body.clientWidth);
    if (pageWidth > 980) {
      padding.left = (pageWidth * 20) / 100;
      padding.right = (pageWidth * 20) / 100;
    } else {
      padding.left = (pageWidth * 5) / 100;
      padding.right = (pageWidth * 5) / 100;

      isSmallDevice = true;
    }

    this.padding = padding;

    const width = pageWidth - (2 * padding.left);
    const height = width * (isSmallDevice ? 0.8 : 0.6);

    const innerPadding = {
      left: isSmallDevice ? 20 : 80,
      right: 40,
      bottom: 10,
    };

    // create an svg container
    const vis = d3.select(".ic-comparison-triangle-history").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // same height and width
    const w = width - (4 * innerPadding.left);
    const h = (Math.sqrt(3) / 2) * (w);
    const m = (width - w) / 2;

    const corners = [[m, h + 20], [w+m, h + 20], [(w/2)+m, 20]];

    const coord = (a, b, c) => {
      let array = [a, b, c];
      let categories = ["lost", "draw", "won"];

      const _max = Math.max(...array);
      const _index = array.indexOf(_max);
      let sum, pos = [0, 0, categories[_index]];

      sum = a + b + c;
      if(sum !== 0) {
        a /= sum;
        b /= sum;
        c /= sum;

        pos[0] =  corners[0][0]  * a + corners[1][0]  * b + corners[2][0]  * c;
        pos[1] =  corners[0][1]  * a + corners[1][1]  * b + corners[2][1]  * c;
      }
      return pos;
    };

    corners.forEach(function(corner, idx) {
      const c1 = idx;

      let c2 = idx + 1;
      if(c2 >= corners.length) { c2 = 0;}

      vis.append("line")
          .attr("x1", corners[c1][0])
          .attr("y1", corners[c1][1])
          .attr("x2", corners[c2][0])
          .attr("y2", corners[c2][1])
          .style("stroke-width", 1)
          .style("stroke", "#c3c3c3")
          .classed('ct-axis', true);
    });

    const ticks = [0,20,40,60,80,100], n = ticks.length;

    ticks.forEach(function(v) {

      const coord1 = coord(v, 0, 100-v);
      const coord2 = coord(v, 100-v, 0);
      const coord3 = coord(0, 100-v, v);
      const coord4 = coord(100-v, 0, v);

      if(v !== 0 && v !== 100) {

        /*
        vis.append("line")
            .attr("x1", coord1[0])
            .attr("y1", coord1[1])
            .attr("x2", coord2[0])
            .attr("y2", coord2[1])
            .classed('ct-tick tick-a', true);

        vis.append("line")
            .attr("x1", coord2[0])
            .attr("y1", coord2[1])
            .attr("x2", coord3[0])
            .attr("y2", coord3[1])
            .classed('ct-tick tick-b', true);

        vis.append("line")
            .attr("x1", coord3[0])
            .attr("y1", coord3[1])
            .attr("x2", coord4[0])
            .attr("y2", coord4[1])
            .classed('ct-tick tick-c', true);
        */

      }

      /*
      vis.append("text")
          .attr("x", coord1[0] - 15)
          .attr("y", coord1[1]  )
          .text( function (d) { return v; })
          .classed('ct-tick-text tick-a', true);

      vis.append("text")
          .attr("x", coord2[0] - 6)
          .attr("y", coord2[1] + 10 )
          .text( function (d) { return (100- v); })
          .classed('ct-tick-text tick-b', true);

      vis.append("text")
          .attr("x", coord3[0] + 6)
          .attr("y", coord3[1] )
          .text( function (d) { return v; })
          .classed('ct-tick-text tick-c', true);
      */

    });

    /*
    * Axis Legend (Lost, Draw, Won)
    * */

    const topCoord = coord(0, 0, 1);
    vis.append("text")
        .attr("x", topCoord[0] - 15)
        .attr("y", topCoord[1] - 10 )
        .attr("font-weight", "bold")
        .attr("font-family", "arial")
        .attr("font-size", "12px")
        .attr("fill", "green")
        .text("Won");

    const leftCoord = coord(1, 0, 0);
    vis.append("text")
        .attr("x", leftCoord[0] - 15)
        .attr("y", leftCoord[1] + 20 )
        .attr("font-weight", "bold")
        .attr("font-family", "arial")
        .attr("font-size", "12px")
        .attr("fill", "red")
        .text("Lost");

    const rightCoord = coord(0, 1, 0);
    vis.append("text")
        .attr("x", rightCoord[0] - 15)
        .attr("y", rightCoord[1] + 20)
        .attr("font-weight", "bold")
        .attr("font-family", "arial")
        .attr("font-size", "12px")
        .attr("fill", "#bb9a39")
        .text("Draw");

    /*
    * Axis Section Legend
    * */

    const bottomSectionPoint = coord(1, 1, 0);
    // bottom right
    vis.append("text")
        .attr("x", bottomSectionPoint[0] + 15)
        .attr("y", bottomSectionPoint[1] + 20)
        .attr("font-family", "arial")
        .attr("font-size", "10px")
        .attr("fill", "#c3c3c3")
        .text("More Draw ⟶");
    // bottom left
    vis.append("text")
        .attr("x", bottomSectionPoint[0] - 15)
        .attr("y", bottomSectionPoint[1] + 20)
        .attr("font-family", "arial")
        .attr("text-anchor", "end")
        .attr("font-size", "10px")
        .attr("fill", "#c3c3c3")
        .text("⟵ More Lost");

    const rightSectionPoint = coord(0, 1, 1);
    // right bottom
    vis.append("text")
        .attr("x", rightSectionPoint[0] + 20)
        .attr("y", rightSectionPoint[1])
        .attr("font-family", "arial")
        .attr("font-size", "10px")
        .attr("fill", "#c3c3c3")
        .attr("transform", "rotate(60, " + (rightSectionPoint[0] + 15) + ", " + (rightSectionPoint[1]) + ")")
        .text("More Draw ⟶");
    // right top
    vis.append("text")
        .attr("x", rightSectionPoint[0] - 5)
        .attr("y", rightSectionPoint[1])
        .attr("font-family", "arial")
        .attr("font-size", "10px")
        .attr("fill", "#c3c3c3")
        .attr("transform", "rotate(60, " + (rightSectionPoint[0] + 15) + ", " + (rightSectionPoint[1]) + ")")
        .attr("text-anchor", "end")
        .text("⟵ More Won");

    const leftSectionPoint = coord(1, 0, 1);
    // left top
    vis.append("text")
        .attr("x", leftSectionPoint[0] - 15)
        .attr("y", leftSectionPoint[1] - 10)
        .attr("font-size", "10px")
        .attr("font-family", "arial")
        .attr("fill", "#c3c3c3")
        .attr("transform", "rotate(-60, " + (leftSectionPoint[0] - 15) + ", " + (leftSectionPoint[1] - 20) + ")")
        .text("More Won ⟶");
    // left bottom
    vis.append("text")
        .attr("x", leftSectionPoint[0] - 15)
        .attr("y", leftSectionPoint[1])
        .attr("font-family", "arial")
        .attr("font-size", "10px")
        .attr("fill", "#c3c3c3")
        .attr("transform", "rotate(-60, " + (leftSectionPoint[0] - 15) + ", " + (leftSectionPoint[1]) + ")")
        .attr("text-anchor", "end")
        .text("⟵ More Lost");

    /*
    * Axis Legend Fill
    * */

    const centroid = coord(10, 10, 10);

    /*
    // Won
    vis.append("polygon")
        .attr("points", "" + centroid[0] + "," + centroid[1] + " " + rightSectionPoint[0] + "," + rightSectionPoint[1] + " " + topCoord[0] + "," + topCoord[1])
        .attr("fill-opacity", "0.1")
        .attr("fill", "#00bb00");

    vis.append("polygon")
        .attr("points", "" + centroid[0] + "," + centroid[1] + " " + leftSectionPoint[0] + "," + leftSectionPoint[1] + " " + topCoord[0] + "," + topCoord[1])
        .attr("fill-opacity", "0.1")
        .attr("fill", "#00bb00");

    // Lost
    vis.append("polygon")
        .attr("points", "" + centroid[0] + "," + centroid[1] + " " + leftSectionPoint[0] + "," + leftSectionPoint[1] + " " + leftCoord[0] + "," + leftCoord[1])
        .attr("fill-opacity", "0.1")
        .attr("fill", "#ff0000");

    vis.append("polygon")
        .attr("points", "" + centroid[0] + "," + centroid[1] + " " + bottomSectionPoint[0] + "," + bottomSectionPoint[1] + " " + leftCoord[0] + "," + leftCoord[1])
        .attr("fill-opacity", "0.1")
        .attr("fill", "#ff0000");

    // Draw
    vis.append("polygon")
        .attr("points", "" + centroid[0] + "," + centroid[1] + " " + rightSectionPoint[0] + "," + rightSectionPoint[1] + " " + rightCoord[0] + "," + rightCoord[1])
        .attr("fill-opacity", "0.1")
        .attr("fill", "#e9f460");

    vis.append("polygon")
        .attr("points", "" + centroid[0] + "," + centroid[1] + " " + bottomSectionPoint[0] + "," + bottomSectionPoint[1] + " " + rightCoord[0] + "," + rightCoord[1])
        .attr("fill-opacity", "0.1")
        .attr("fill", "#e9f460");
    */

    vis.append("line")
        .attr("x1", centroid[0])
        .attr("y1", centroid[1])
        .attr("x2", rightSectionPoint[0])
        .attr("y2", rightSectionPoint[1])
        .attr("stroke-dasharray", "1,1")
        .classed('ct-tick', true);

    vis.append("line")
        .attr("x1", centroid[0])
        .attr("y1", centroid[1])
        .attr("x2", leftSectionPoint[0])
        .attr("y2", leftSectionPoint[1])
        .attr("stroke-dasharray", "1,1")
        .classed('ct-tick', true);

    vis.append("line")
        .attr("x1", centroid[0])
        .attr("y1", centroid[1])
        .attr("x2", bottomSectionPoint[0])
        .attr("y2", bottomSectionPoint[1])
        .attr("stroke-dasharray", "1,1")
        .classed('ct-tick', true);

    // add hover tooltip
    d3.select('.ic-comparison-triangle-history')
        .append('div')
        .attr('class', 'comparison-triangle-history-tooltip');

    this.vis = vis;
    this.coord = coord;

    this.renderCircles('India');
  }

  renderCircles(t) {
    // Show all circles at once
    /*
    const processedMatchData = [];
    const yearList = [];

    for (let year in matchData) {
      if (matchData.hasOwnProperty(year)) {
        for (let i = 0; i < matchData[year].length; i++) {
          if (matchData[year][i].team === this.state.team) {
            yearList.push(year);

            processedMatchData.push(this.coord(matchData[year][i].lost, matchData[year][i].draw, matchData[year][i].won));
          }
        }
      }
    }

    const circles = this.vis.selectAll("circle")
        .data(processedMatchData);

    const visRef = this.vis;

    const choose = () => {
      const choices = [-1, 1];
      const index = Math.floor(Math.random() * choices.length);
      return choices[index];
    };

    const getColor = () => {

    };

    circles.enter().append("circle")
        .attr("cx", function (d, i) {
          visRef.append("text")
              .attr("class", "team-label")
              .attr("x", d[0])
              .attr("dx", 5)
              .attr("y", d[1])
              .attr("dy", 5)
              .attr("font-size", isSmallDevice ? "8px" : "10px")
              .text(yearList[i]);

          return d[0];
        })
        .attr("cy", function (d) { return d[1]; })
        .attr("fill", "orange")
        .attr("r", isSmallDevice ? 3 : 5)
        .on('mouseover', function (d, i) {
          // TODO: mention custom implementation of tooltip
          d3.select('.comparison-triangle-history-tooltip')
              .style('visibility', 'visible')
              .html("");
        })
        .on('mouseout', function (d) {
          d3.select('.comparison-triangle-history-tooltip').style('visibility', 'hidden');
        });
    */

    if (t !== 'Select Team') {
      try {
        clearInterval(intervalID);
      } catch (e) {
        //
      }
      intervalID = null;

      const processedMatchData = [];
      const yearList = [];

      for (let year in matchData) {
        if (matchData.hasOwnProperty(year)) {
          for (let i = 0; i < matchData[year].length; i++) {
            if (matchData[year][i].team === t) {
              yearList.push(year + "'s");

              processedMatchData.push(this.coord(matchData[year][i].lost, matchData[year][i].draw, matchData[year][i].won));
            }
          }
        }
      }

      let idx = 0;
      const circle = this.vis.append("circle")
          .attr("class", "team-circle");

      const visRef = this.vis;

      const getColor = (category) => {
        if (category === "won") {
          return "green"
        } else if (category === "lost") {
          return "red"
        } else if (category === "draw") {
          return "#bb9a39"
        }
      };

      intervalID = setInterval(() => {
        circle
            .transition()
            .attr("fill", getColor(processedMatchData[idx][2]))
            .attr("cx", processedMatchData[idx][0])
            .attr("cy", processedMatchData[idx][1])
            .attr("r", isSmallDevice ? 3 : 5);

        if (idx !== 0) {
          console.log(processedMatchData[idx]);
          visRef.append("line")
              .attr("class", "team-circle-trail")
              .attr("stroke", getColor(processedMatchData[idx][2]))
              .attr("stroke-width", "2")
              .attr("stroke-opacity", "0.2")
              .attr("x1", processedMatchData[idx - 1][0])
              .attr("y1", processedMatchData[idx - 1][1])
              .attr("x2", processedMatchData[idx][0])
              .attr("y2", processedMatchData[idx][1]);
        }

        visRef.append("circle")
            .attr("class", "team-circle-light")
            .attr("fill-opacity", "0.6")
            .attr("fill", getColor(processedMatchData[idx][2]))
            .attr("cx", processedMatchData[idx][0])
            .attr("cy", processedMatchData[idx][1])
            .attr("r", isSmallDevice ? 1.5 : 3);

        if (idx === 0  || idx === processedMatchData.length - 1) {
          visRef.append("text")
              .attr("class", "team-label")
              .attr("x", processedMatchData[idx][0])
              .attr("dx", 5)
              .attr("y", processedMatchData[idx][1])
              .attr("font-size", isSmallDevice ? "8px" : "10px")
              .text(yearList[idx])
        } else if (processedMatchData[idx][2] !== processedMatchData[idx - 1][2]) {
          visRef.append("text")
              .attr("class", "team-label")
              .attr("x", processedMatchData[idx][0])
              .attr("dx", 5)
              .attr("y", processedMatchData[idx][1])
              .attr("font-size", isSmallDevice ? "8px" : "10px")
              .text(yearList[idx])
        }

        idx = (idx + 1) % (processedMatchData.length);
        // stop after a loop
        if (idx === 0) {
          clearInterval(intervalID);
          intervalID = null;
        }
      }, 1000);
    }
  }

  onTeamChange() {
    let sValue;

    try {
      sValue = document.querySelector(".ic-comparison-triangle-history-selection").value;
    } catch (e) {
      sValue = "Select Team"
    }

    this.setState({
      team: sValue,
    }, () => {
      // (lost, draw, won)
      try {
        this.vis.selectAll(".team-circle").remove();
        this.vis.selectAll(".team-circle-light").remove();
        this.vis.selectAll(".team-circle-trail").remove();
        this.vis.selectAll(".team-label").remove();
      } catch(e) {
        //
      }

      this.renderCircles(sValue === 'Select Team' ? 'India' : sValue);
    });
  }

  render() {
    return (
        <div>
          <div
              style={{
                textAlign: 'center',
                border: '1px solid lightgrey',
                width: isSmallDevice ? '80%' : '40%',
                margin: 'auto',
                padding: '10px 10px 10px 8px',
                fontSize: isSmallDevice ? '10px' : '15px',
              }}
              dangerouslySetInnerHTML={{ __html: ComparisonTriangleHistory.getTeamHistoryDescription(this.state.team) }}>
          </div>
          <div style={{ textAlign: 'center', width: 'max-content', margin: 'auto', padding: '10px 10px 0px 8px' }}>
            <b>Historical Timeline </b> &nbsp;
            <select className="ic-comparison-triangle-history-selection" onChange={this.onTeamChange}>
              <option>Select Team</option>
              <option>West Indies</option>
              <option>Australia</option>
              <option>India</option>
              <option>England</option>
              <option>Pakistan</option>
              <option>South Africa</option>
              <option>Sri Lanka</option>
              <option>Bangladesh</option>
              <option>New Zealand</option>
              <option>Zimbabwe</option>
            </select>
          </div>
          <div className="ic-comparison-triangle-history"/>
        </div>
    );
  }
}

export default ComparisonTriangleHistory;