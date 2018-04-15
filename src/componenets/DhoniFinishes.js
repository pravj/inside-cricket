import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

// colors for possible runs scored [0 ... 6+]
const runColors = ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'];

const matches = [
  {
    date: '07/31/2005',
    versus: 'WI',
    won: true,
    total: 15,
    runs: [
      {ball: '35.1', run: 4, other: true},
      {ball: '35.2', run: 0, other: true},
      {ball: '35.3', run: 1, other: true},
      {ball: '35.4', run: 0, other: false},
      {ball: '35.5', run: 0, other: false},
      {ball: '35.6', run: 6, other: false},
    ]
  },
  {
    date: '09/02/2005',
    versus: 'NZ',
    won: true,
    total: 37,
    runs: [
      {ball: '47.1', run: 0, other: false},
      {ball: '47.2', run: 4, other: false},
      {ball: '47.3', run: 2, other: false},
    ]
  },
  {
    date: '09/04/2005',
    versus: 'ZIM',
    won: true,
    total: 67,
    runs: [
      {ball: '48.1', run: 6, other: false},
    ]
  },
  {
    date: '10/31/2005',
    versus: 'SL',
    won: true,
    total: 183,
    runs: [
      {ball: '46.1', run: 6, other: false},
    ]
  },
  {
    date: '11/03/2005',
    versus: 'SL',
    won: true,
    total: 45,
    runs: [
      {ball: '45.1', run: 2, other: false},
      {ball: '45.2', run: 2, other: false},
      {ball: '45.3', run: 6, other: false},
      {ball: '45.4', run: 6, other: false},
    ]
  },
  {
    date: '02/13/2006',
    versus: 'PAK',
    won: true,
    total: 72,
    runs: [
      {ball: '47.1', run: 1, other: true},
      {ball: '47.2', run: 0, other: false},
      {ball: '47.3', run: 0, other: false},
      {ball: '47.4', run: 4, other: false},
    ]
  },
  {
    date: '02/16/2006',
    versus: 'PAK',
    won: true,
    total: 2,
    runs: [
      {ball: '32.1', run: 0, other: true},
      {ball: '32.2', run: 0, other: true},
      {ball: '32.3', run: 4, other: true},
    ]
  },
  {
    date: '02/19/2006',
    versus: 'PAK',
    won: true,
    total: 77,
    runs: [
      {ball: '46.1', run: 1, other: true},
      {ball: '46.2', run: 0, other: false},
      {ball: '46.3', run: 6, other: false},
      {ball: '46.4', run: 6, other: false},
      {ball: '46.5', run: 1, other: false},
    ]
  },
  {
    date: '04/06/2006',
    versus: 'ENG',
    won: true,
    total: 10,
    runs: [
      {ball: '47.1', run: 0, other: false},
      {ball: '47.2', run: 1, other: false},
    ]
  },
  {
    date: '02/14/2007',
    versus: 'SL',
    won: true,
    total: 67,
    runs: [
      {ball: '47.1', run: 0, other: false},
      {ball: '47.2', run: 1, other: false},
    ]
  },
];

class DhoniFinishes extends Component {
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
    const vis = d3.select(".ic-dhoni-finishes").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    vis.append("circle")
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("r", 5)

    /*
    const rectWidth = 20;
    for(let i = 0; i < matches.length; i++) {
      const xPosition = innerPadding.left + i * (rectWidth + 5);
      const runs = matches[i].runs;
      console.log('first loop', i, xPosition, runs);

      for(let j = 0; j < runs.length; j++) {
        console.log('add', xPosition, rectWidth, runColors[runs[j].run])
        vis.append("rect")
            .attr("x", xPosition)
            .attr("y", (6 * rectWidth) - (j * rectWidth))
            .attr("width", rectWidth)
            .attr("height", rectWidth)
            .attr("fill", runColors[runs[j].run]);
      }
    }
    */
  }

  render() {
    return (
        <div className="ic-dhoni-finishes">
        </div>
    );
  }
}

export default DhoniFinishes;