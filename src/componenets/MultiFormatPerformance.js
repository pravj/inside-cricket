import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

const performanceCount = [
  {
    'team': 'AUS',
    'name': 'Australia',
    'won': {
      'test': 382,
      'odi': 555,
      't20': 48,
    },
    'lost': {
      'test': 216,
      'odi': 311,
      't20': 46,
    },
    'draw': {
      'test': 210,
      'odi': 43,
      't20': 1,
    }
  },
  {
    'team': 'IND',
    'name': 'India',
    'won': {
      'test': 143,
      'odi': 478,
      't20': 56,
    },
    'lost': {
      'test': 160,
      'odi': 408,
      't20': 33,
    },
    'draw': {
      'test': 217,
      'odi': 47,
      't20': 2,
    }
  },
  {
    'team': 'BAN',
    'name': 'Bangladesh',
    'won': {
      'test': 10,
      'odi': 107,
      't20': 21,
    },
    'lost': {
      'test': 79,
      'odi': 223,
      't20': 46,
    },
    'draw': {
      'test': 15,
      'odi': 7,
      't20': 2,
    }
  },
  {
    'team': 'PAK',
    'name': 'Pakistan',
    'won': {
      'test': 132,
      'odi': 469,
      't20': 73,
    },
    'lost': {
      'test': 121,
      'odi': 394,
      't20': 47,
    },
    'draw': {
      'test': 159,
      'odi': 26,
      't20': 0,
    }
  },
  {
    'team': 'ENG',
    'name': 'England',
    'won': {
      'test': 355,
      'odi': 345,
      't20': 47,
    },
    'lost': {
      'test': 295,
      'odi': 323,
      't20': 45,
    },
    'draw': {
      'test': 345,
      'odi': 32,
      't20': 4,
    }
  },
  {
    'team': 'NZ',
    'name': 'New Zealand',
    'won': {
      'test': 91,
      'odi': 332,
      't20': 53,
    },
    'lost': {
      'test': 170,
      'odi': 363,
      't20': 46,
    },
    'draw': {
      'test': 163,
      'odi': 45,
      't20': 4,
    }
  },
  {
    'team': 'WI',
    'name': 'West Indies',
    'won': {
      'test': 168,
      'odi': 380,
      't20': 46,
    },
    'lost': {
      'test': 187,
      'odi': 355,
      't20': 43,
    },
    'draw': {
      'test': 175,
      'odi': 36,
      't20': 5,
    }
  },
  {
    'team': 'SL',
    'name': 'Sri Lanka',
    'won': {
      'test': 84,
      'odi': 375,
      't20': 52,
    },
    'lost': {
      'test': 100,
      'odi': 399,
      't20': 49,
    },
    'draw': {
      'test': 83,
      'odi': 41,
      't20': 1,
    }
  },
  {
    'team': 'SA',
    'name': 'South Africa',
    'won': {
      'test': 158,
      'odi': 361,
      't20': 59,
    },
    'lost': {
      'test': 138,
      'odi': 200,
      't20': 40,
    },
    'draw': {
      'test': 124,
      'odi': 22,
      't20': 1,
    }
  },
  {
    'team': 'ZIM',
    'name': 'Zimbabwe',
    'won': {
      'test': 11,
      'odi': 131,
      't20': 13,
    },
    'lost': {
      'test': 67,
      'odi': 346,
      't20': 40,
    },
    'draw': {
      'test': 27,
      'odi': 17,
      't20': 1,
    }
  }
];

class MultiFormatPerformance extends Component {
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
    const vis = d3.select(".ic-multi-format-performance").append("svg:svg")
        .attr("width", width)
        .attr("height", height + innerPadding.bottom);

    // define the y scale (vertical)
    const yScale = d3.scaleLinear()
        .domain([0, 600])
        .range([height - innerPadding.bottom, 0]);

    // dataset
    const data = performanceCount;

    // define the x scale (time)
    const xScale = d3.scaleLinear()
        .domain([0, 450])
        .range([innerPadding.left, width - innerPadding.right])

    // define the y axis
    const yAxis = d3.axisLeft(yScale)
        .tickValues([100, 200, 300, 400, 500]);

    // define the x axis
    const xAxis = d3.axisBottom(xScale)
        .tickValues([100, 200, 300, 400]);

    // append the x axis
    vis.append("g")
        .attr("transform", "translate(0,"+ (height - innerPadding.bottom) +")")
        .call(xAxis);

    // append the y axis
    vis.append("g")
        .attr("transform", "translate("+ innerPadding.left +",0)")
        .call(yAxis);

    // test tooltip
    const testTip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return "" + (d.name) + " (Test)</br></br>" + "Won: " + d.won.test + "</br>" + "Lost: " + d.lost.test + "</br>" + "Draw: " + d.draw.test;
    });

    testTip.direction(function(d) {
      return 'n';
    });

    vis.call(testTip);

    // odi tooltip
    const odiTip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return "" + (d.name) + " (ODI)</br></br>" + "Won: " + d.won.odi + "</br>" + "Lost: " + d.lost.odi + "</br>" + "Draw: " + d.draw.odi;
    });

    odiTip.direction(function(d) {
      return 'n';
    });

    vis.call(odiTip);

    // small circle radius on smaller screen sizes
    const radiusFactor = (isSmallDevice ? 0.3 : 1);

    // X axis legend
    vis.append("text")
        .attr("x", "80%")
        .attr("text-anchor", "end")
        .attr("font-size", isSmallDevice ? '10px' : '12px')
        .attr("y", height - 2 * innerPadding.bottom)
        .text("Matches Lost ⟶");

    // Y axis legend
    const yLegendTranslate = isSmallDevice ? 30 : 0;
    vis.append("text")
        .attr("x", isSmallDevice ? "20%" : "10%")
        .attr("y", "10%")
        .attr("font-size", isSmallDevice ? '10px' : '12px')
        .attr("transform", "translate(" + yLegendTranslate + ", 200) rotate(-90)")
        .text("Matches Won ⟶");

    // test format legend circle
    vis.append("circle")
        .attr("cx", "20%")
        .attr("cy", "10%")
        .attr("r", isSmallDevice ? "5" : "10")
        .attr("fill", "lightgreen");

    // test format legend label
    vis.append("text")
        .attr("x", "20%")
        .attr("y", "10%")
        .attr("dx", "15")
        .attr("dy", "5")
        .attr("font-size", isSmallDevice ? '10px' : '12px')
        .text("Test");

    // odi format legend circle
    vis.append("circle")
        .attr("cx", "20%")
        .attr("cy", "15%")
        .attr("r", isSmallDevice ? "5" : "10")
        .attr("fill", "skyblue");

    // odi format legend label
    vis.append("text")
        .attr("x", "20%")
        .attr("y", "15%")
        .attr("dx", "15")
        .attr("dy", "5")
        .attr("font-size", isSmallDevice ? '10px' : '12px')
        .text("ODI");

    // Y = X line
    vis.append('line')
        .attr('x1', xScale(0))
        .attr('y1', yScale(0))
        .attr('x2', xScale(450))
        .attr('y2', yScale(450))
        .style("stroke-dasharray", ("2, 2"))
        .attr('stroke', 'grey');

    // Y > X (upper rectangle)
    vis.append("rect")
        .attr("x", innerPadding.left)
        .attr("y", 0)
        .attr("width", width - (innerPadding.left + innerPadding.right))
        .attr("height", height - (innerPadding.bottom))
        .attr("fill", "lightgreen")
        .attr("fill-opacity", "0.1");

    // Y > X legend
    vis.append("text")
        .attr("x", "50%")
        .attr("y", "55%")
        .attr("font-size", isSmallDevice ? '10px' : '15px')
        .attr("font-weight", 'bold')
        .attr("text-anchor", "end")
        .text("Won more matches")
        .attr("fill", "green")
        .attr("fill-opacity", "1");

    // Y < X (lower triangle)
    vis.append("polygon")
        .attr("points", "" + xScale(0) + "," + yScale(0) + " " + (width - innerPadding.left) + "," + yScale(450) + " " + (width - innerPadding.left) + "," + yScale(0))
        .attr("fill", "rgba(230, 120, 130, 0.1)")
        .attr("fill-opacity", "1");

    // Y < X legend
    vis.append("text")
        .attr("x", "55%")
        .attr("y", "60%")
        .attr("font-size", isSmallDevice ? '10px' : '15px')
        .attr("font-weight", 'bold')
        .attr("text-anchor", "start")
        .text("Lost more matches")
        .attr("fill", "rgba(250, 100, 110, 1)");

    // team circles for test format
    vis.selectAll(".test-format-circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) { return xScale(d.lost.test); })
        .attr("cy", function(d) { return yScale(d.won.test); })
        .attr("r", function (d) {
          return radiusFactor * (d.lost.test + d.won.test + d.draw.test) / 40;
        })
        .attr("fill", "lightgreen")
        .on('mouseover', testTip.show)
        .on('mouseout', testTip.hide);

    // team labels for test format
    vis.selectAll(".test-format-label")
        .data(data)
        .enter().append("text")
        .attr("x", function(d) { return xScale(d.lost.test) - (d.team === 'IND' || d.team === 'BAN' ? -5 : 10); })
        .attr("y", function(d) { return yScale(d.won.test); })
        .attr("font-size", isSmallDevice ? '5px' : '10px')
        .text(function (d) {
          return (d.team);
        })
        .on('mouseover', testTip.show)
        .on('mouseout', testTip.hide);

    // team circles for odi format
    vis.selectAll(".odi-format-circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) { return xScale(d.lost.odi); })
        .attr("cy", function(d) { return yScale(d.won.odi); })
        .attr("r", function (d) {
          return radiusFactor * (d.lost.odi + d.won.odi + d.draw.odi) / 40;
        })
        .attr("fill", "skyblue")
        .on('mouseover', odiTip.show)
        .on('mouseout', odiTip.hide);

    // team labels for odi format
    vis.selectAll(".odi-format-label")
        .data(data)
        .enter().append("text")
        .attr("x", function(d) { return xScale(d.lost.odi) - (d.team === 'IND' || d.team === 'BAN' ? -5 : 10); })
        .attr("y", function(d) { return yScale(d.won.odi); })
        .attr("font-size", isSmallDevice ? '5px' : '10px')
        .text(function (d) {
          return (d.team);
        })
        .on('mouseover', odiTip.show)
        .on('mouseout', odiTip.hide);
  }

  render() {
    return (
        <div className="ic-multi-format-performance"/>
    );
  }
}

export default MultiFormatPerformance;