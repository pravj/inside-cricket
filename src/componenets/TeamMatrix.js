import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

// TODO: tooltip for player names
// TODO: replicate the same for test team

class TeamMatrix extends Component {
  componentDidMount() {
    const padding = {}

    const pageWidth = (window.innerWidth || document.body.clientWidth);
    if (pageWidth > 980) {
      padding.left = (pageWidth * 20) / 100;
      padding.right = (pageWidth * 20) / 100;
    } else {
      padding.left = (pageWidth * 10) / 100;
      padding.right = (pageWidth * 10) / 100;
    }

    const width = pageWidth - (2 * padding.left);

    const years = [];
    const totalYears = 13;

    for (let i = 0; i < totalYears; i++) {
      years.push(2004 + i + '');
    }

    const widthGap = 5;
    const blockSide = ((width / totalYears) - widthGap);
    const height = totalYears * (blockSide + widthGap);

    // create an svg container
    const vis = d3.select(".ic-team-matrix").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    const tip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return d.team + " (" + d.year + ") " + d.players + " player(s)";
    });

    tip.direction(function(d) {
      return 'n';
    });

    vis.call(tip);

    const teamColors = {
      "AUS": "#FEDF00",
      "IND": "#2255a4",
      "SL": "#dd8318",
      "SA": "#0E793B",
      "PAK": "#12453C",
      "ENG": "#152a5e",
      "WI": "#790D19",
      "NZ": "#000000",
      "BAN": "#17481e",
    }

    const teamData = {
      "AUS": [3, 4, 4, 3, 5, 3, 5, 1, 1, 1, 2, 2, 3],
      "IND": [2, 1, 3, 1, 2, 3, 2, 4, 3, 3, 3, 1, 3],
      "SL": [1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1, 2, 3],
      "SA": [2, 0, 0, 2, 1, 0, 1, 2, 1, 2, 3, 3, 3],
      "ENG": [1, 2, 1, 1, 0, 2, 2, 1, 2, 1, 0, 0, 1],
      "NZ": [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0],
      "PAK": [0, 2, 0, 0, 0, 1, 0, 1, 2, 1, 1, 0, 0],
      "WI": [2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      "BAN": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    }

    const teamNames = Object.keys(teamData);

    const tempData = [];
    for (let i = 0; i < totalYears; i++) {
      const year = years[i];
      for (let j = 0; j < teamNames.length; j++) {
        const h = j * (blockSide + widthGap);
        const w = i * (blockSide + widthGap);

        tempData.push({
          team: teamNames[j],
          year: year,
          players: teamData[teamNames[j]][i],
          h: h,
          w: w,
        })
      }
    }

    vis.selectAll(".team-matrix-item")
        .data(tempData)
        .enter().append("rect")
        .attr("y", function (d) {
          return d.h;
        })
        .attr("x", function (d) {
          return d.w;
        })
        .attr("class", ".team-matrix-item")
        .attr("height", blockSide)
        .attr("fill", function (d) {
          return d.players === 0 ? '#ebedf0' : teamColors[d.team];
        })
        .attr("fill-opacity", function (d) {
          return d.players === 0 ? 0.5 : d.players * 0.2;
        })
        .attr("width", blockSide)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    /*
    for (let i = 0; i < totalYears; i++) {
      // const year = years[i];

      for (let j = 0; j < teamNames.length; j++) {
        const h = j * (blockSide + widthGap);
        const w = i * (blockSide + widthGap);
        const team = teamNames[j];
        vis.append("rect")
            .attr("y", h)
            .attr("x", w)
            .attr("class", "team-xi")
            .attr("height", blockSide)
            .attr("fill", teamData[team][i] === 0 ? '#ebedf0' : teamColors[team])
            .attr("fill-opacity", teamData[team][i] === 0 ? 0.5 : teamData[team][i] * 0.2)
            .attr("width", blockSide)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
      }
    }
    */
  }

  render() {
    return (
        <div className="ic-team-matrix"/>
    );
  }
}

export default TeamMatrix;