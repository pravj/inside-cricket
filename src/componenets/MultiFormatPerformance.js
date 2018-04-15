import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

// STATSGURU
const performanceCount = [
  {
    'team': 'AUS',
    'name': 'Australia',
    'won': {
      'test': 383,
      'odi': 556,
    },
    'lost': {
      'test': 219,
      'odi': 312,
    },
    'draw': {
      'test': 210,
      'odi': 43,
    }
  },
  {
    'team': 'IND',
    'name': 'India',
    'won': {
      'test': 144,
      'odi': 483,
    },
    'lost': {
      'test': 160,
      'odi': 409,
    },
    'draw': {
      'test': 217,
      'odi': 47,
    }
  },
  {
    'team': 'BAN',
    'name': 'Bangladesh',
    'won': {
      'test': 10,
      'odi': 108,
    },
    'lost': {
      'test': 80,
      'odi': 225,
    },
    'draw': {
      'test': 16,
      'odi': 7,
    }
  },
  {
    'team': 'PAK',
    'name': 'Pakistan',
    'won': {
      'test': 132,
      'odi': 469,
    },
    'lost': {
      'test': 122,
      'odi': 394,
    },
    'draw': {
      'test': 158,
      'odi': 26,
    }
  },
  {
    'team': 'ENG',
    'name': 'England',
    'won': {
      'test': 356,
      'odi': 350,
    },
    'lost': {
      'test': 296,
      'odi': 325,
    },
    'draw': {
      'test': 345,
      'odi': 32,
    }
  },
  {
    'team': 'NZ',
    'name': 'New Zealand',
    'won': {
      'test': 92,
      'odi': 334,
    },
    'lost': {
      'test': 170,
      'odi': 365,
    },
    'draw': {
      'test': 164,
      'odi': 45,
    }
  },
  {
    'team': 'WI',
    'name': 'West Indies',
    'won': {
      'test': 168,
      'odi': 385,
    },
    'lost': {
      'test': 187,
      'odi': 356,
    },
    'draw': {
      'test': 175,
      'odi': 36,
    }
  },
  {
    'team': 'SL',
    'name': 'Sri Lanka',
    'won': {
      'test': 85,
      'odi': 376,
    },
    'lost': {
      'test': 100,
      'odi': 399,
    },
    'draw': {
      'test': 84,
      'odi': 41,
    }
  },
  {
    'team': 'SA',
    'name': 'South Africa',
    'won': {
      'test': 161,
      'odi': 362,
    },
    'lost': {
      'test': 140,
      'odi': 205,
    },
    'draw': {
      'test': 124,
      'odi': 22,
    }
  },
  {
    'team': 'ZIM',
    'name': 'Zimbabwe',
    'won': {
      'test': 11,
      'odi': 134,
    },
    'lost': {
      'test': 67,
      'odi': 354,
    },
    'draw': {
      'test': 27,
      'odi': 18,
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
      return "" + (d.name) + " (Test)</br></br>" + "Won: " + d.won.test + "</br>" + "Lost: " + d.lost.test + "</br>" + "No Results: " + d.draw.test;
    });

    testTip.direction(function(d) {
      return 'n';
    });

    vis.call(testTip);

    // odi tooltip
    const odiTip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return "" + (d.name) + " (ODI)</br></br>" + "Won: " + d.won.odi + "</br>" + "Lost: " + d.lost.odi + "</br>" + "No Results: " + d.draw.odi;
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