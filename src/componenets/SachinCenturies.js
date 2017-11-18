import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

// TODO: First Century Gap

const centuries = {
  "scores": [
    {
      "date": "12/18/1989",
      "run": 0,
      "total": 0,
      "notout": false,
      "opponent": ""
    },
    {
      "date": "09/09/1994",
      "run": 110,
      "total": "2236",
      "notout": false,
      "won": true,
      "opponent": "Australia"
    },
    {
      "date": "10/28/1994",
      "run": 115,
      "total": "2359",
      "notout": false,
      "won": true,
      "opponent": "New Zealand"
    },
    {
      "date": "11/11/1994",
      "run": 105,
      "total": "2768",
      "notout": false,
      "won": true,
      "opponent": "West Indies"
    },
    {
      "date": "04/09/1995",
      "run": 112,
      "total": "3029",
      "notout": true,
      "won": true,
      "opponent": "Sri Lanka"
    },
    {
      "date": "02/18/1996",
      "run": 127,
      "total": "3339",
      "notout": true,
      "won": true,
      "opponent": "Kenya"
    },
    {
      "date": "02/27/1996",
      "run": 90,
      "total": "3499",
      "notout": false,
      "opponent": "Australia"
    },
    {
      "date": "03/02/1996",
      "run": 137,
      "total": "3636",
      "notout": false,
      "won": false,
      "opponent": "Sri Lanka"
    },
    {
      "date": "04/05/1996",
      "run": 100,
      "total": "3863",
      "notout": false,
      "won": false,
      "opponent": "Pakistan"
    },
    {
      "date": "04/15/1996",
      "run": 118,
      "total": "3984",
      "notout": false,
      "won": true,
      "opponent": "Pakistan"
    },
    {
      "date": "08/28/1996",
      "run": 110,
      "total": "4205",
      "notout": false,
      "won": false,
      "opponent": "Sri Lanka"
    },
    {
      "date": "12/14/1996",
      "run": 114,
      "total": "4823",
      "notout": false,
      "won": true,
      "opponent": "South Africa"
    },
    {
      "date": "02/09/1997",
      "run": 104,
      "total": "4989",
      "notout": false,
      "won": true,
      "opponent": "Zimbabwe"
    },
    {
      "date": "05/14/1997",
      "run": 117,
      "total": "5315",
      "notout": false,
      "won": true,
      "opponent": "New Zealand"
    },
    {
      "date": "12/11/1997",
      "run": 91,
      "total": "5742",
      "notout": false,
      "opponent": "England"
    },
    {
      "date": "01/14/1998",
      "run": 95,
      "total": "6050",
      "notout": false,
      "opponent": "Pakistan"
    },
    {
      "date": "04/07/1998",
      "run": 100,
      "total": "6205",
      "notout": false,
      "won": true,
      "opponent": "Australia"
    },
    {
      "date": "04/22/1998",
      "run": 143,
      "total": "6522",
      "notout": false,
      "won": false,
      "opponent": "Australia"
    },
    {
      "date": "04/24/1998",
      "run": 134,
      "total": "6656",
      "notout": false,
      "won": true,
      "opponent": "Australia"
    },
    {
      "date": "05/31/1998",
      "run": 100,
      "total": "6807",
      "notout": true,
      "won": true,
      "opponent": "Kenya"
    },
    {
      "date": "07/07/1998",
      "run": 128,
      "total": "7070",
      "notout": false,
      "won": true,
      "opponent": "Sri Lanka"
    },
    {
      "date": "09/26/1998",
      "run": 127,
      "total": "7274",
      "notout": true,
      "won": true,
      "opponent": "Zimbabwe"
    },
    {
      "date": "10/28/1998",
      "run": 141,
      "total": "7446",
      "notout": false,
      "won": true,
      "opponent": "Australia"
    },
    {
      "date": "11/08/1998",
      "run": 118,
      "total": "7575",
      "notout": true,
      "won": true,
      "opponent": "Zimbabwe"
    },
    {
      "date": "11/13/1998",
      "run": 124,
      "total": "7728",
      "notout": true,
      "won": true,
      "opponent": "Zimbabwe"
    },
    {
      "date": "05/23/1999",
      "run": 140,
      "total": "7969",
      "notout": true,
      "won": true,
      "opponent": "Kenya"    },
    {
      "date": "08/29/1999",
      "run": 120,
      "total": "8225",
      "notout": false,
      "won": true,
      "opponent": "Sri Lanka"    },
    {
      "date": "11/08/1999",
      "run": 186,
      "total": "8568",
      "notout": true,
      "won": true,
      "opponent": "New Zealand"    },
    {
      "date": "01/21/2000",
      "run": 93,
      "total": "8690",
      "notout": false,
      "opponent": "Pakistan"    },
    {
      "date": "03/17/2000",
      "run": 122,
      "total": "8950",
      "notout": false,
      "won": true,
      "opponent": "South Africa"    },
    {
      "date": "03/19/2000",
      "run": 93,
      "total": "9043",
      "notout": false,
      "opponent": "South Africa"    },
    {
      "date": "06/01/2000",
      "run": 93,
      "total": "9237",
      "notout": false,
      "opponent": "Sri Lanka"    },
    {
      "date": "10/20/2000",
      "run": 101,
      "total": "9534",
      "notout": false,
      "won": false,
      "opponent": "Sri Lanka"    },
    {
      "date": "12/08/2000",
      "run": 146,
      "total": "9810",
      "notout": false,
      "won": false,
      "opponent": "Zimbabwe"    },
    {
      "date": "03/31/2001",
      "run": 139,
      "total": "10105",
      "notout": false,
      "won": true,
      "opponent": "Australia"    },
    {
      "date": "07/04/2001",
      "run": 122,
      "total": "10461",
      "notout": true,
      "won": true,
      "opponent": "West Indies"    },
    {
      "date": "10/05/2001",
      "run": 101,
      "total": "10562",
      "notout": false,
      "won": false,
      "opponent": "South Africa"    },
    {
      "date": "10/24/2001",
      "run": 146,
      "total": "10786",
      "notout": false,
      "won": true,
      "opponent": "Kenya"    },
    {
      "date": "07/04/2002",
      "run": 105,
      "total": "11323",
      "notout": true,
      "opponent": "England"    },
    {
      "date": "07/11/2002",
      "run": 113,
      "total": "11491",
      "notout": false,
      "won": true,
      "opponent": "Sri Lanka"    },
    {
      "date": "02/23/2003",
      "run": 152,
      "total": "11867",
      "notout": false,
      "won": true,
      "opponent": "Namibia"    },
    {
      "date": "03/01/2003",
      "run": 98,
      "total": "12015",
      "notout": false,
      "opponent": "Pakistan"    },
    {
      "date": "03/10/2003",
      "run": 97,
      "total": "12117",
      "notout": false,
      "opponent": "Sri Lanka"    },
    {
      "date": "10/26/2003",
      "run": 100,
      "total": "12367",
      "notout": false,
      "won": true,
      "opponent": "Australia"    },
    {
      "date": "11/15/2003",
      "run": 102,
      "total": "12640",
      "notout": false,
      "won": true,
      "opponent": "New Zealand"    },
    {
      "date": "03/16/2004",
      "run": 141,
      "total": "13090",
      "notout": false,
      "won": false,
      "opponent": "Pakistan"    },
    {
      "date": "04/12/2005",
      "run": 123,
      "total": "13632",
      "notout": false,
      "won": false,
      "opponent": "Pakistan"    },
    {
      "date": "10/25/2005",
      "run": 93,
      "total": "13735",
      "notout": false,
      "opponent": "Sri Lanka"    },
    {
      "date": "02/06/2006",
      "run": 100,
      "total": "14009",
      "notout": false,
      "won": false,
      "opponent": "Pakistan"    },
    {
      "date": "02/13/2006",
      "run": 95,
      "total": "14146",
      "notout": false,
      "opponent": "Pakistan"
    },
    {
      "date": "09/14/2006",
      "run": 141,
      "total": "14289",
      "notout": true,
      "won": false,
      "opponent": "West Indies"    },
    {
      "date": "01/31/2007",
      "run": 100,
      "total": "14728",
      "notout": true,
      "won": true,
      "opponent": "West Indies"    },
    {
      "date": "06/26/2007",
      "run": 99,
      "total": "14950",
      "notout": false,
      "opponent": "South Africa"    },
    {
      "date": "06/29/2007",
      "run": 93,
      "total": "15043",
      "notout": false,
      "opponent": "South Africa"    },
    {
      "date": "08/24/2007",
      "run": 99,
      "total": "15167",
      "notout": false,
      "opponent": "England"    },
    {
      "date": "09/05/2007",
      "run": 94,
      "total": "15395",
      "notout": false,
      "opponent": "England"    },
    {
      "date": "11/08/2007",
      "run": 99,
      "total": "15806",
      "notout": false,
      "opponent": "Pakistan"    },
    {
      "date": "11/15/2007",
      "run": 97,
      "total": "15932",
      "notout": false,
      "opponent": "Pakistan"    },
    {
      "date": "03/02/2008",
      "run": 117,
      "total": "16270",
      "notout": true,
      "won": true,
      "opponent": "Australia"    },
    {
      "date": "03/04/2008",
      "run": 91,
      "total": "16361",
      "notout": false,
      "opponent": "Australia"    },
    {
      "date": "03/08/2009",
      "run": 163,
      "total": "16684",
      "notout": true,
      "won": true,
      "opponent": "New Zealand"    },
    {
      "date": "09/14/2009",
      "run": 138,
      "total": "16895",
      "notout": false,
      "won": true,
      "opponent": "Sri Lanka"    },
    {
      "date": "11/05/2009",
      "run": 175,
      "total": "17168",
      "notout": false,
      "won": false,
      "opponent": "Australia"    },
    {
      "date": "02/24/2010",
      "run": 200,
      "total": "17598",
      "notout": true,
      "won": true,
      "opponent": "South Africa"    },
    {
      "date": "02/27/2011",
      "run": 120,
      "total": "17777",
      "notout": false,
      "opponent": "England"    },
    {
      "date": "03/12/2011",
      "run": 111,
      "total": "17953",
      "notout": false,
      "won": false,
      "opponent": "South Africa"    },
    {
      "date": "03/16/2012",
      "run": 114,
      "total": "18374",
      "notout": false,
      "won": false,
      "opponent": "Bangladesh"    },
    {
      "date": "03/18/2012",
      "run": 0,
      "total": "18426",
      "notout": false,
      "opponent": ""    }
  ]
}

class SachinCenturies extends Component {
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
    const vis = d3.select(".ic-sachin-century-content").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // define the y scale (vertical)
    const yScale = d3.scaleLinear()
        .domain([90, 230])
        .range([height - innerPadding.bottom, 0]);

    // dataset
    const data = centuries['scores'];

    const minDate = new Date(data[0].date);
    const maxDate = new Date(data[data.length-1].date);

    // define the x scale (time)
    const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([innerPadding.left, width - innerPadding.right])

    // define the y axis
    const yAxis = d3.axisLeft(yScale)
        .tickValues([90, 100, 150, 200]);

    // define the x axis
    const xAxis = d3.axisBottom(xScale)
        .ticks(5);

    // append the x axis
    vis.append("g")
        .call(xAxis);

    // append the y axis
    vis.append("g")
        .attr("transform", "translate("+ innerPadding.left +",0)")
        .call(yAxis);

    const tip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return "" + d.run + (d.notout ? "*" : "") + " runs vs " + d.opponent;
    });

    tip.direction(function(d) {
      return 'n';
    });

    vis.call(tip);

    // small circle radius on smaller screen sizes
    const radiusFactor = (isSmallDevice ? 0.5 : 1);

    // century circles
    vis.selectAll(".bar.century")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) { return xScale(new Date(d.date)); })
        .attr("cy", function(d) { return yScale(d.run); })
        .attr("r", function (d) {
          return (d.run === 0 ? 0 : (d.run < 100 ? 2 * radiusFactor : 5 * radiusFactor));
        })
        .attr("fill", function (d) {
          if((d.run >= 90 && d.run < 100) || (d.won === undefined)) {
            return "#090909";
          } else if (d.won) {
            return "#138e39";
          } else {
            return "#ff0000";
          }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    // nervous ninety zone
    vis.append("rect")
        .attr("x", innerPadding.left)
        .attr("y", yScale(100))
        .attr("width", width - (innerPadding.right + innerPadding.left))
        .attr("height", yScale(90)-yScale(100))
        .attr("fill", "#ff0000")
        .attr("fill-opacity", "0.2");

    /*
    // tennis elbow zone
    vis.append("rect")
        .attr("x", xScale(new Date("06/01/2003")))
        .attr("y", yScale(210))
        .attr("width", xScale(new Date("06/01/2006")) - xScale(new Date("06/01/2003")))
        .attr("height", Math.abs(yScale(100) - yScale(210)))
        .attr("fill", "#adadad")
        .attr("fill-opacity", "0.2");
    */

    const topLegendVis = d3.select(".ic-sachin-century-legend-top").append("svg:svg")
        .attr("width", width)
        .attr("height", 20);

    const bottomLegendVis = d3.select(".ic-sachin-century-legend-bottom").append("svg:svg")
        .attr("width", width)
        .attr("height", 20);

    topLegendVis.append("circle")
        .attr("cx", 10 + innerPadding.left)
        .attr("cy", 10)
        .attr("r", 5)
        .attr("fill", "#138e39");

    topLegendVis.append("text")
        .attr("x", 25 + innerPadding.left)
        .attr("y", 15)
        .text("India Won");

    topLegendVis.append("circle")
        .attr("cx", 105 + innerPadding.left)
        .attr("cy", 10)
        .attr("r", 5)
        .attr("fill", "#ff0000");

    topLegendVis.append("text")
        .attr("x", 115 + innerPadding.left)
        .attr("y", 15)
        .text("India Lost");

    bottomLegendVis.append("rect")
        .attr("x", 40)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#ff0000")
        .attr("fill-opacity", "0.2");

    bottomLegendVis.append("circle")
        .attr("cx", 10 + innerPadding.left)
        .attr("cy", 10)
        .attr("r", 2)
        .attr("fill", "#090909");

    bottomLegendVis.append("text")
        .attr("x", 25 + innerPadding.left)
        .attr("y", 15)
        .text("Nervous 90's");

    bottomLegendVis.append("circle")
        .attr("cx", 125 + innerPadding.left)
        .attr("cy", 10)
        .attr("r", 5)
        .attr("fill", "#090909");

    bottomLegendVis.append("text")
        .attr("x", 135 + innerPadding.left)
        .attr("y", 15)
        .text("No Results");
  }

  render() {
    return (
        <div className="ic-sachin-century">
          <div className="ic-sachin-century-legend-top"/>
          <div className="ic-sachin-century-legend-bottom"/>
          <div className="ic-sachin-century-content"/>
        </div>
    );
  }
}

export default SachinCenturies;