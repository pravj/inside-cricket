import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';
import * as topojson from 'topojson'

/*

var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
            })

var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

var path = d3.geoPath();

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

queue()
    .defer(d3.json, "world_countries.json")
    .defer(d3.tsv, "world_population.tsv")
    .await(ready);

function ready(error, data, population) {
  var populationById = {};

  population.forEach(function(d) { populationById[d.id] = +d.population; });
  data.features.forEach(function(d) { d.population = populationById[d.id] });

  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(populationById[d.id]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  svg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);
}

* */


class WorldMap extends Component {
  static calculateOpacity(year, type) {
    if (type === 'full') {
      return 0.1 + ((2017 - year) / 120);
    } else if (type === 'associate') {
      return 3 * ((2016 - year) / 170);
    }
  }

  componentDidMount() {
    const margin = {};
    let isSmallDevice = false;

    const pageWidth = (window.innerWidth || document.body.clientWidth);
    if (pageWidth > 980) {
      margin.left = (pageWidth * 15) / 100;
      margin.right = (pageWidth * 15) / 100;
    } else {
      margin.left = (pageWidth * 5) / 100;
      margin.right = (pageWidth * 5) / 100;

      isSmallDevice = true;
    }

    const innerPadding = {
      left: 40,
      right: 40,
      bottom: 10,
    };

    const width = pageWidth - (2 * margin.left);
    const height = width * 0.7;

    const format = d3.format("");

    const tip = d3tip().attr("class", "d3-tip-box").offset([10, 10]).html(function (d) {
      if (isNaN(format(d.year))) {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>";
      } else {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Member since: </strong><span class='details'>" + format(d.year) +"</span>";
      }
    });

    tip.direction(function(d) {
      return 's';
    });

    const color = d3.scaleThreshold()
        .domain([1900,1910,1920,1930,1940,1950,1960,1970,1980,1990,2000,2010,2020])
        .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

    // create an svg container
    const vis = d3.select(".ic-world-map").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class", "map");

    const mapScaleFactor = (isSmallDevice ? 55 : 110);

    const projection = d3.geoMercator()
        .scale(mapScaleFactor)
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    vis.append('circle').attr('id', 'tipfollowscursor');
    vis.call(tip);
    // vis.call(tip);

    const onDataLoad = (error, data, population) => {
      const populationById = {};
      const membershipById = {};
      population.forEach(function(d) {
        populationById[d.id] = +d.year;
        membershipById[d.id] = d.type;
      });
      data.features.forEach(function(d) {
        d.year = populationById[d.id];
        d.membership = membershipById[d.id];
      });

      vis.append("g")
          .attr("class", "countries")
          .selectAll("path")
          .data(data.features)
          .enter().append("path")
          .attr("d", path)
          .style("fill", function(d) {
            if (d.membership === 'F') {
              const c = 'rgba(39, 141, 170, ' + WorldMap.calculateOpacity(populationById[d.id], 'full') + ')';
              console.log(c);
              return c;
            } else if (d.membership === 'A') {
              return 'rgba(232, 63, 111, ' + WorldMap.calculateOpacity(populationById[d.id], 'associate') + ')';
            } else {
              return '#ffffff';
            }
          })
          .style('stroke', 'white')
          .style('stroke-width', 1.5)
          .style("opacity",function (d) {
            if (typeof d.membership !== 'string') {
              return 0;
            } else {
              return 0.81;
            }
          })
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on("mouseover", function (d) {
            /*
            const target = d3.select('#tipfollowscursor')
                .attr('cx', d3.event.offsetX + 10)
                .attr('cy', d3.event.offsetY - 15) // 5 pixels above the cursor
                .node();
            tip.show(d, target);
            */
            if (d.year !== undefined) {
              tip.show(d);

              d3.select(this)
                  .style("opacity", 1)
                  .style("stroke-width", 2);
            }
          })
          .on('mouseout', function(d){
            /*
            const target = d3.select('#tipfollowscursor')
                .attr('cx', d3.event.offsetX)
                .attr('cy', d3.event.offsetY - 5) // 5 pixels above the cursor
                .node();
            tip.hide(d, target);
            */
            if (d.year !== undefined) {
              tip.hide(d);

              d3.select(this)
                  .style("opacity", 0.8)
                  .style("stroke","white")
                  .style("stroke-width",0.3);
            }
          });

      vis.append("path")
          .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
          .attr("class", "names")
          .attr("d", path);
    };

    // https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
    d3.queue()
        .defer(d3.json, '/world_countries.json')
        .defer(d3.csv, '/icc_members.csv')
        .await(onDataLoad);

    const topLegendVis = d3.select(".ic-world-map-legend-top").append("svg:svg")
        .attr("width", width)
        .attr("height", 30);

    topLegendVis.append("text")
        .attr("x", margin.left)
        .attr("y", 15)
        .attr("font-size", 12)
        .text("(1909)");

    topLegendVis.append("rect")
        .attr("x", margin.left + 40)
        .attr("y", 6)
        .attr("width", 30)
        .attr("height", 10)
        .attr("fill", 'rgba(39, 141, 170, 1)');

    topLegendVis.append("rect")
        .attr("x", margin.left + 75)
        .attr("y", 6)
        .attr("width", 30)
        .attr("height", 10)
        .attr("fill", 'rgba(39, 141, 170, 0.5)');

    topLegendVis.append("rect")
        .attr("x", margin.left + 110)
        .attr("y", 6)
        .attr("width", 30)
        .attr("height", 10)
        .attr("fill", 'rgba(39, 141, 170, 0.1)');

    topLegendVis.append("text")
        .attr("x", margin.left + 150)
        .attr("y", 15)
        .attr("font-size", 12)
        .text("(2017) Full members");

    const bottomLegendVis = d3.select(".ic-world-map-legend-bottom").append("svg:svg")
        .attr("width", width)
        .attr("height", 30);

    bottomLegendVis.append("text")
        .attr("x", margin.left)
        .attr("y", 15)
        .attr("font-size", 12)
        .text("(1965)");

    bottomLegendVis.append("rect")
        .attr("x", margin.left + 40)
        .attr("y", 6)
        .attr("width", 30)
        .attr("height", 10)
        .attr("fill", 'rgba(232, 63, 111, 1)');

    bottomLegendVis.append("rect")
        .attr("x", margin.left + 75)
        .attr("y", 6)
        .attr("width", 30)
        .attr("height", 10)
        .attr("fill", 'rgba(232, 63, 111, 0.5)');

    bottomLegendVis.append("rect")
        .attr("x", margin.left + 110)
        .attr("y", 6)
        .attr("width", 30)
        .attr("height", 10)
        .attr("fill", 'rgba(232, 63, 111, 0.1)');

    bottomLegendVis.append("text")
        .attr("x", margin.left + 150)
        .attr("y", 15)
        .attr("font-size", 12)
        .text("(2016) Associate members");
  }

  render() {
    /*
    <div className="ic-world-map-legend">




          </div>

          <p className="ic-world-map-legend-top-title">Full members</p>
          <p className="ic-world-map-legend-bottom-title"/>
    * */
    return (
        <div>
          <p className="ic-chart-title" style={{ position: 'relative', top: '20px' }}>"ICC Member Countries"</p>
          <div className="ic-world-map"/>
          <div className="ic-world-map-legend-top"/>
          <div className="ic-world-map-legend-bottom"/>
        </div>
    );
  }
}

export default WorldMap;