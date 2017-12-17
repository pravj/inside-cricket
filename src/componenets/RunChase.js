import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

const runPoints = {
  "scores": [
    {
      "date": "05/22/2010",
      "player": "Hashim Amla",
      "innings": 24,
      "runs": 1000,
      "index": 0,
    },
    {
      "date": "06/05/2010",
      "player": "Virat Kohli",
      "innings": 24,
      "runs": 1000,
      "index": 1,
    },
    {
      "date": "01/21/2011",
      "player": "Hashim Amla",
      "innings": 40,
      "runs": 2000,
      "index": 3,
    },
    {
      "date": "06/08/2011",
      "player": "Virat Kohli",
      "innings": 53,
      "runs": 2000,
      "index": 4,
    },
    {
      "date": "02/14/2012",
      "player": "Virat Kohli",
      "innings": 75,
      "runs": 3000,
      "index": 5,
    },
    {
      "date": "08/28/2012",
      "player": "Hashim Amla",
      "innings": 57,
      "runs": 3000,
      "index": 6,
    },
    {
      "date": "01/19/2013",
      "player": "Virat Kohli",
      "innings": 93,
      "runs": 4000,
      "index": 7,
    },
    {
      "date": "11/21/2013",
      "player": "Virat Kohli",
      "innings": 114,
      "runs": 5000,
      "index": 8,
    },
    {
      "date": "12/08/2013",
      "player": "Hashim Amla",
      "innings": 81,
      "runs": 4000,
      "index": 9,
    },
    {
      "date": "11/09/2014",
      "player": "Virat Kohli",
      "innings": 136,
      "runs": 6000,
      "index": 10,
    },
    {
      "date": "01/16/2015",
      "player": "Hashim Amla",
      "innings": 101,
      "runs": 5000,
      "index": 11,
    },
    {
      "date": "10/25/2015",
      "player": "Hashim Amla",
      "innings": 123,
      "runs": 6000,
      "index": 12,
    },
    {
      "date": "01/17/2016",
      "player": "Virat Kohli",
      "innings": 161,
      "runs": 7000,
      "index": 13,
    },
    {
      "date": "05/29/2017",
      "player": "Hashim Amla",
      "innings": 150,
      "runs": 7000,
      "index": 14,
    },
    {
      "date": "06/15/2017",
      "player": "Virat Kohli",
      "innings": 175,
      "runs": 8000,
      "index": 15,
    },
    {
      "date": "10/29/2017",
      "player": "Virat Kohli",
      "innings": 194,
      "runs": 9000,
      "index": 16,
    },
  ]
}

class RunChase extends Component {
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
    const height = width * 0.7;

    const innerPadding = {
      left: 40,
      right: 40,
      bottom: 10,
    };

    // create an svg container
    const vis = d3.select(".ic-runchase-content").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // create another svg container
    const inningsHeight = width * 0.2;
    const inningsVis = d3.select(".ic-runchase-innings-content").append("svg:svg")
        .attr("width", width)
        .attr("height", inningsHeight);

    // define the y scale (vertical)
    const inningsYScale = d3.scaleLinear()
        .domain([0, 50])
        .range([inningsHeight - innerPadding.bottom, 0]);

    // define the x scale (runs)
    const inningsXScale = d3.scaleLinear()
        .domain([0, 10000])
        .range([innerPadding.left, width - innerPadding.right]);

    // define the y axis
    const inningsYAxis = d3.axisLeft(inningsYScale)
        .tickValues([10, 20, 30]);

    // define the x axis
    const inningsXAxis = d3.axisBottom(inningsXScale)
        .tickValues([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000])
        .tickFormat(function (d) {
          return d3.format(".1s")(d);
        });

    // append the x axis
    inningsVis.append("g")
        .attr("transform", "translate("+ innerPadding.left +",0)")
        .call(inningsYAxis);

    // append the x axis
    inningsVis.append("g")
        .call(inningsXAxis);

    // define the y scale (vertical)
    const yScale = d3.scaleLinear()
        .domain([0, 10000])
        .range([height - innerPadding.bottom, 0]);

    // dataset
    const data = runPoints['scores'];

    // const minDate = new Date(data[0].date);
    const minDate = new Date("01/01/2010")
    const maxDate = new Date(data[data.length-1].date);

    // define the x scale (time)
    const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([innerPadding.left, width - innerPadding.right])

    // define the y axis
    const yAxis = d3.axisLeft(yScale)
        .tickValues([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]);

    // define the x axis
    let xAxis;
    if (isSmallDevice) {
      xAxis = d3.axisBottom(xScale)
          .ticks(4);
    } else {
      xAxis = d3.axisBottom(xScale)
          .ticks(7);
    }

    // append the x axis
    vis.append("g")
        .call(xAxis);

    // append the y axis
    vis.append("g")
        .attr("transform", "translate("+ innerPadding.left +",0)")
        .call(yAxis);

    const tip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return "(" + d.player + ") " + d.runs + " Runs<br> " + d.date + " " + d.innings + " innings";
    });

    tip.direction(function(d) {
      return 'n';
    });

    vis.call(tip);

    // small circle radius on smaller screen sizes
    const radiusFactor = (isSmallDevice ? 0.6 : 1);

    // horizontal axis lines
    for(let i = 1; i <= 9; i++) {
      vis.append('line')
          .attr('x1', xScale(new Date("01/01/2010")))
          .attr('y1', (yScale(1000 * i)))
          .attr('x2', xScale(new Date(data[15]['date'])))
          .attr('y2', (yScale(1000 * i)))
          .style("stroke-dasharray", ("2, 2"))
          .attr('stroke', 'black');
    }

    // vertical axis lines
    const verticalLines = isSmallDevice ? 3 : 7;
    const verticalLineValues = isSmallDevice ? [2012, 2014, 2016] : [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    for (let i = 1; i <= verticalLines; i++) {
      let d = verticalLineValues[i-1] + '';
      vis.append('line')
          .attr('x1', xScale(new Date("01/01/" + d)))
          .attr('y1', (yScale(10000)))
          .attr('x2', xScale(new Date("01/01/" + d)))
          .attr('y2', (yScale(0)))
          .style("stroke-dasharray", ("2, 2"))
          .attr('stroke', 'black');
    }

    // previous point of player
    const points = {'Virat Kohli': null, 'Hashim Amla': null};

    // width of the individual player's inning bar
    const inningBarWidth = isSmallDevice ? 8 : 20;

    // century circles
    const tips = [];
    vis.selectAll(".score.point")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) { return xScale(new Date(d.date)); })
        .attr("cy", function(d) { return yScale(d.runs); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .transition()
        .delay(function (d, i) {
          return (i + 1) * 500;
        })
        .attr("r", function (d) {
          return (d.run === 0 ? 0 : (d.run < 100 ? 2 * radiusFactor : 5 * radiusFactor));
        })
        .attr("fill", function (d) {
          if((d.player === "Hashim Amla")) {
            return "#8e3783";
          } else if ((d.player === "Virat Kohli")) {
            return "#6ca1dd";
          }
        })
        .on('start', (d) => {
          // add a bar for innings comparison
          const inningsDiff = points[d.player] === null ? d.innings : (d.innings - points[d.player]['innings']);

          // a new tooltip for the bar
          const _tip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function() {
            return "(" + d.player + ") " + inningsDiff + " innings";
          });

          _tip.direction(function() {
            return 'n';
          });

          vis.call(_tip);

          inningsVis.append("rect")
              .attr("x", function () {
                if (d.player === 'Hashim Amla') {
                  return inningsXScale(d.runs) - (inningBarWidth);
                } else if (d.player === 'Virat Kohli') {
                  return inningsXScale(d.runs);
                }
              })
              .attr("y", inningsYScale(inningsDiff) - inningsYScale(50))
              .attr("width", inningBarWidth)
              .attr("height", inningsYScale(0))
              .attr("fill", function () {
                if (d.player === 'Hashim Amla') {
                  return '#8e3783';
                } else if (d.player === 'Virat Kohli') {
                  return '#6ca1dd';
                }
              })
              .on('mouseover', _tip.show)
              .on('mouseout', _tip.hide);

          // add a line from previous score to current for this player
          if (points[d.player] !== null) {
            const lineColor = d.player === 'Virat Kohli' ? '#6ca1dd' : '#8e3783';
            const oldScore = points[d.player];

            vis.append('line')
                .attr('x1', xScale(new Date(oldScore['date'])))
                .attr('y1', (yScale(oldScore['runs'])))
                .attr('x2', xScale(new Date(d['date'])))
                .attr('y2', (yScale(d['runs'])))
                .attr('stroke', lineColor);
          }

          // add this score to be used later
          points[d.player] = d;
        })

    // legend section: top (player names)
    const topLegendVis = d3.select(".ic-runchase-top-legend").append("svg:svg")
        .attr("width", width)
        .attr("height", 20);

    topLegendVis.append("rect")
        .attr("x", innerPadding.left)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#8e3783");

    topLegendVis.append("text")
        .attr("x", 25 + innerPadding.left)
        .attr("y", 15)
        .text("Hashim Amla");

    topLegendVis.append("rect")
        .attr("x", 130 + innerPadding.left)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#6ca1dd");

    topLegendVis.append("text")
        .attr("x", 155 + innerPadding.left)
        .attr("y", 15)
        .text("Virat Kohli");

    // legend section: bottom
    const bottomLegendVis = d3.select(".ic-runchase-innings-legend").append("svg:svg")
        .attr("width", width)
        .attr("height", 20);

    bottomLegendVis.append("text")
        .attr("x", 15)
        .attr("y", 15)
        .attr("font-size", isSmallDevice ? '12px' : '18px')
        .text("Innings played to score the next 1000 runs");
  }

  render() {
    return (
        <div className="ic-runchase">
          <div className="ic-runchase-top-legend"/>
          <div className="ic-runchase-content"/>
          <div className="ic-runchase-innings-legend"/>
          <div className="ic-runchase-innings-content"/>
        </div>
    );
  }
}

export default RunChase;