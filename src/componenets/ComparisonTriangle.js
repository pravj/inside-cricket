import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

// (Lost, Draw, Won)
const matchData = {
  "1900's": [
    {team: 'Australia', code: 'AUS', won: 16, lost: 9, draw: 8},
    {team: 'England', code: 'ENG', won: 11, lost: 18, draw: 9},
    {team: 'South Africa', code: 'SA', won: 4, lost: 4, draw: 3},
  ],
  "1910's": [
    {team: 'Australia', code: 'AUS', won: 7, lost: 6, draw: 3},
    {team: 'England', code: 'ENG', won: 14, lost: 4, draw: 3},
    {team: 'South Africa', code: 'SA', won: 4, lost: 15, draw: 2},
  ],
  "1920's": [
    {team: 'Australia', code: 'AUS', won: 14, lost: 6, draw: 8},
    {team: 'England', code: 'ENG', won: 18, lost: 16, draw: 14},
    {team: 'South Africa', code: 'SA', won: 3, lost: 10, draw: 10},
    {team: 'West Indies', code: 'WI', won: 0, lost: 3, draw: 0},
  ],
  "1930's": [
    {team: 'Australia', code: 'AUS', won: 22, lost: 10, draw: 7},
    {team: 'England', code: 'ENG', won: 23, lost: 14, draw: 35},
    {team: 'South Africa', code: 'SA', won: 4, lost: 10, draw: 13},
    {team: 'West Indies', code: 'WI', won: 4, lost: 9, draw: 6},
    {team: 'India', code: 'IND', won: 0, lost: 5, draw: 2},
    {team: 'New Zealand', code: 'NZ', won: 0, lost: 5, draw: 9},
  ],
  "1940's": [
    {team: 'Australia', code: 'AUS', won: 14, lost: 0, draw: 4},
    {team: 'England', code: 'ENG', won: 6, lost: 9, draw: 17},
    {team: 'South Africa', code: 'SA', won: 0, lost: 7, draw: 5},
    {team: 'West Indies', code: 'WI', won: 3, lost: 0, draw: 6},
    {team: 'India', code: 'IND', won: 0, lost: 6, draw: 7},
    {team: 'New Zealand', code: 'NZ', won: 0, lost: 1, draw: 5},
  ],
  "1950's": [
    {team: 'Australia', code: 'AUS', won: 29, lost: 12, draw: 16},
    {team: 'England', code: 'ENG', won: 39, lost: 22, draw: 22},
    {team: 'South Africa', code: 'SA', won: 12, lost: 15, draw: 8},
    {team: 'West Indies', code: 'WI', won: 18, lost: 17, draw: 13},
    {team: 'India', code: 'IND', won: 6, lost: 17, draw: 21},
    {team: 'New Zealand', code: 'NZ', won: 1, lost: 21, draw: 10},
    {team: 'Pakistan', code: 'PAK', won: 8, lost: 9, draw: 12},
  ],
};

class ComparisonTriangle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRange: "1900's",
    };

    this.onTimeChange = this.onTimeChange.bind(this);

    this.vis = null;
    this.coord = null;
    this.padding = null;
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

    this.padding = padding;

    const width = pageWidth - (2 * padding.left);
    const height = width * (isSmallDevice ? 0.8 : 0.6);

    const innerPadding = {
      left: isSmallDevice ? 20 : 80,
      right: 40,
      bottom: 10,
    };

    // create an svg container
    const vis = d3.select(".ic-comparison-triangle").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // same height and width
    const w = width - (4 * innerPadding.left);
    const h = (Math.sqrt(3) / 2) * (w);
    const m = (width - w) / 2;

    const corners = [[m, h + 20], [w+m, h + 20], [(w/2)+m, 20]];

    const coord = (a, b, c) => {
      let sum, pos = [0,0];
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
        .text("Won");

    const leftCoord = coord(1, 0, 0);
    vis.append("text")
        .attr("x", leftCoord[0] - 15)
        .attr("y", leftCoord[1] + 20 )
        .attr("font-weight", "bold")
        .attr("font-family", "arial")
        .attr("font-size", "12px")
        .text("Lost");

    const rightCoord = coord(0, 1, 0);
    vis.append("text")
        .attr("x", rightCoord[0] - 15)
        .attr("y", rightCoord[1] + 20)
        .attr("font-weight", "bold")
        .attr("font-family", "arial")
        .attr("font-size", "12px")
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
        .text("More Draw ⟶");
    // bottom left
    vis.append("text")
        .attr("x", bottomSectionPoint[0] - 15)
        .attr("y", bottomSectionPoint[1] + 20)
        .attr("font-family", "arial")
        .attr("text-anchor", "end")
        .attr("font-size", "10px")
        .text("⟵ More Lost");

    const rightSectionPoint = coord(0, 1, 1);
    // right bottom
    vis.append("text")
        .attr("x", rightSectionPoint[0] + 20)
        .attr("y", rightSectionPoint[1])
        .attr("font-family", "arial")
        .attr("font-size", "10px")
        .attr("transform", "rotate(60, " + (rightSectionPoint[0] + 15) + ", " + (rightSectionPoint[1]) + ")")
        .text("More Draw ⟶");
    // right top
    vis.append("text")
        .attr("x", rightSectionPoint[0] - 5)
        .attr("y", rightSectionPoint[1])
        .attr("font-family", "arial")
        .attr("font-size", "10px")
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
        .attr("transform", "rotate(-60, " + (leftSectionPoint[0] - 15) + ", " + (leftSectionPoint[1] - 20) + ")")
        .text("More Won ⟶");
    // left bottom
    vis.append("text")
        .attr("x", leftSectionPoint[0] - 15)
        .attr("y", leftSectionPoint[1])
        .attr("font-family", "arial")
        .attr("font-size", "10px")
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
        .classed('ct-tick', true);

    vis.append("line")
        .attr("x1", centroid[0])
        .attr("y1", centroid[1])
        .attr("x2", leftSectionPoint[0])
        .attr("y2", leftSectionPoint[1])
        .classed('ct-tick', true);

    vis.append("line")
        .attr("x1", centroid[0])
        .attr("y1", centroid[1])
        .attr("x2", bottomSectionPoint[0])
        .attr("y2", bottomSectionPoint[1])
        .classed('ct-tick', true);

    // add hover tooltip
    d3.select('.ic-comparison-triangle')
        .append('div')
        .attr('class', 'comparison-triangle-tooltip');

    this.vis = vis;
    this.coord = coord;

    this.renderCircles();
  }

  renderCircles() {
    const processedMatchData = [];
    const mData = matchData[this.state.timeRange];

    for (let i = 0; i < mData.length; i++) {
      processedMatchData.push(this.coord(mData[i].lost, mData[i].draw, mData[i].won));
    }

    const circles = this.vis.selectAll("circle")
        .data(processedMatchData);

    const visRef = this.vis;

    circles.enter().append("circle")
        .attr("cx", function (d, i) {
          visRef.append("text")
              .attr("class", "team-label")
              .attr("x", d[0])
              .attr("dx", 10)
              .attr("y", d[1])
              .attr("dy", 5)
              .attr("font-size", "10px")
              .text(mData[i].code);

          return d[0];
        })
        .attr("cy", function (d) { return d[1]; })
        .attr("fill", "orange")
        .attr("r", 5)
        .on('mouseover', function (d, i) {
          // TODO: mention custom implementation of tooltip
          d3.select('.comparison-triangle-tooltip')
              .style('visibility', 'visible')
              .html("<b>" + mData[i].team + "</b> Won: " + mData[i].won + "<br>Lost: " + mData[i].lost + " Draw: " + mData[i].draw);
        })
        .on('mouseout', function (d) {
          d3.select('.comparison-triangle-tooltip').style('visibility', 'hidden');
        });
  }

  onTimeChange()  {
    let sValue;

    try {
      sValue = document.querySelector(".ic-comparison-triangle-selection").value;
    } catch (e) {
      sValue = "1900's"
    }

    this.setState({
      timeRange: sValue,
    }, () => {
      // (lost, draw, won)
      try {
        this.vis.selectAll("circle").remove()
        this.vis.selectAll(".team-label").remove()
      } catch(e) {
        //
      }

      this.renderCircles(matchData[this.state.timeRange]);
    });
  }

  render() {
    return (
        <div>
          <div style={{ textAlign: 'center', border: '1px solid lightgrey', width: 'max-content', margin: 'auto', padding: '10px 10px 0px 8px' }}>
            <b>Compare Test Playing Teams in</b> &nbsp;
            <select className="ic-comparison-triangle-selection" onChange={this.onTimeChange}>
              <option>1900's</option>
              <option>1910's</option>
              <option>1920's</option>
              <option>1930's</option>
              <option>1940's</option>
              <option>1950's</option>
              <option>1960's</option>
              <option>1970's</option>
              <option>1980's</option>
              <option>1990's</option>
              <option>2000's</option>
              <option>2010's</option>
            </select>
          </div>
          <div className="ic-comparison-triangle"/>
        </div>
    );
  }
}

export default ComparisonTriangle;