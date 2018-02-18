import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';


class Ashes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };

    this.buttonClick = null;
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
    // width same as height for small devices
    let height = pageWidth - (2 * padding.left);
    if (!isSmallDevice) {
      height = width * 0.75;
    }

    const innerPadding = {
      left: 40,
      right: 40,
      bottom: 10,
    };

    const degree = Math.PI / 180;

    // create an svg container
    const vis = d3.select(".ic-ashes-content").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // year
    vis.append("text")
        .attr("x", width/2 - 10)
        .attr("y", (2*height)/5)
        .attr("font-weight", 'bold')
        .attr("font-size", isSmallDevice ? '12px' : '18px')
        .attr("class", "ic-ashes-current-year");

    const barVis = d3.select(".ic-ashes-bar-group").append("svg:svg")
        .attr("width", width)
        .attr("height", 30);

    const barLegendVis = d3.select(".ic-ashes-bar-group-legend").append("svg:svg")
        .attr("width", width)
        .attr("height", 20);

    barLegendVis.append("rect")
        .attr("x", innerPadding.left)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#2b4390");

    barLegendVis.append("text")
        .attr("x", innerPadding.left + 15)
        .attr("y", 9)
        .attr("font-size", '10px')
        .attr("font-weight", 'bold')
        .text("ENG");

    barLegendVis.append("rect")
        .attr("x", innerPadding.left + 50)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#cccc00");

    barLegendVis.append("text")
        .attr("x", innerPadding.left + 65)
        .attr("y", 9)
        .attr("font-size", '10px')
        .attr("font-weight", 'bold')
        .text("AUS");

    barLegendVis.append("rect")
        .attr("x", innerPadding.left + 100)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#9c8e83");

    barLegendVis.append("text")
        .attr("x", innerPadding.left + 115)
        .attr("y", 9)
        .attr("font-size", '10px')
        .attr("font-weight", 'bold')
        .text("DRAW");

    const totalSeriesCount = 69;
    const barWidth = ((width - 2 * (innerPadding.left)) / totalSeriesCount);
    const barPositionX = innerPadding.left;

    const tip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return "" + d.winner + " " + d.year + "";
    });

    tip.direction(function(d) {
      return 'n';
    });

    barVis.call(tip);

    // size of the country circle (radius)
    const circleRadius = isSmallDevice ? 15 : 30;

    // left circle (australia)
    vis.append("circle")
        .attr("cx", width/5)
        .attr("cy", (2*height)/5)
        .attr("r", circleRadius)
        .attr("class", "AUS-circle")
        .attr("fill", "#CCCC00")
        .attr("fill-opacity", 0.3);

    // team name text
    vis.append("text")
        .attr("x", width/5 - ((2 * circleRadius) + 10))
        .attr("y", (2*height)/5 + 5)
        .attr("font-size", isSmallDevice ? '12px' : '18px')
        .text("AUS");

    // team series win count
    vis.append("text")
        .attr("x", (width/5) - 7)
        .attr("y", (2*height)/5 + 5)
        .attr("font-size", isSmallDevice ? '12px' : '18px')
        .attr("class", "AUS-win-count")
        .text("0");

    // right circle (englang)
    vis.append("circle")
        .attr("cx", (4*width)/5)
        .attr("cy", (2*height)/5)
        .attr("r", circleRadius)
        .attr("class", "ENG-circle")
        .attr("fill", "#2b4390")
        .attr("fill-opacity", 0.3);

    // team name text
    vis.append("text")
        .attr("x", ((4*width)/5 + (circleRadius + 5)))
        .attr("y", (2*height)/5 + 5)
        .attr("font-size", isSmallDevice ? '12px' : '18px')
        .text("ENG");

    // team series win count
    vis.append("text")
        .attr("x", (4*width)/5 - 7)
        .attr("y", (2*height)/5 + 5)
        .attr("fill", "#ffffff")
        .attr("font-size", isSmallDevice ? '12px' : '18px')
        .attr("class", "ENG-win-count")
        .text("0");

    const arc = d3.arc()
        .innerRadius((width/2 - ((width/5) + circleRadius - 1)))
        .outerRadius((width/2 - ((width/5) + circleRadius)));

    const exchangeData = [
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1882-83', y: (2*height)/5, banner: 'England won the first Ashes series and continued the winning streak for the first 8 series.'},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1884', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1884-85', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1886', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1886-87', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1887-88', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1888', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1890', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1891-92', y: (2*height)/5, banner: 'Australia won their first Ashes series in the 1891-92 tour.'},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1893', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1894-95', y: (2*height)/5, banner: 'England dominated the next three series despite having internal player dispute.'},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1896', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1897-98', y: (2*height)/5, banner: 'Australia started building the momentum under the captaincy of Harry Trott and Joe Darling.'},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1899', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1901-02', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1902', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1903-04', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1905', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1907-08', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1909', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1911-12', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1912', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1920-21', y: (2*height)/5, banner: 'After the World War I, Australia took the control of Ashes and world cricket'},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1921', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1924-25', y: (2*height)/5, banner: 'This was the first Test series to be covered locally on the radio.'},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1926', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1928-29', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1930', y: (2*height)/5, banner: 'The first series of Sir Don Bradman, he scored a total of 974 runs in 5 tests.'},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1932-33', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1934', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1936-37', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'DRAW', process: false, year: '1938', y: (2*height)/5, banner: 'Australia retained the Ashes after the 1938 tour as it was the first series draw.'},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1946-47', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1948', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1950-51', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1953', y: (2*height)/5, banner: 'Finally, England had something to celebrate as they regained the Ashes after 19 years.'},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1954-55', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1956', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1958-59', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1961', y: (2*height)/5, banner: 'Richie Benaud, the Australian captain, played a crucial role as Australia regained the Ashes in 1961.'},
      {color: '#cccc00', holder: 'AUS', winner: 'DRAW', process: false, year: '1962-63', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1964', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'DRAW', process: false, year: '1965-66', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'DRAW', process: false, year: '1968', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1970-71', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'DRAW', process: false, year: '1972', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1974-75', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1975', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1977', y: (2*height)/5, banner: 'England started dominating again with players like Ian Botham and Mike Gatting.'},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1978-79', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1981', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1982-83', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '1985', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '1986-87', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '1989', y: (2*height)/5, banner: 'Australia was at their cricketing peak from late 90\'s to 2003.'},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1990-91', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1993', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1994-95', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1997', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '1998-99', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '2001', y: (2*height)/5},
      {color: '#cccc00', holder: 'AUS', winner: 'AUS', process: false, year: '2002-03', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '2005', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '2006-07', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '2009', y: (2*height)/5, banner: 'With new age players like Alastair Cook and Kevin Pietersen, England was back in the business.'},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '2010-11', y: (2*height)/5},
      {color: '#2b4390', holder: 'ENG', winner: 'ENG', process: false, year: '2013', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '2013-14', y: (2*height)/5},
      {startAngle: -90 * degree, endAngle: 90 * degree, color: '#2b4390', holder: 'ENG', winner: 'ENG', process: true, year: '2015', y: (2*height)/5},
      {startAngle: 90 * degree, endAngle: 270 * degree, color: '#cccc00', holder: 'AUS', winner: 'AUS', process: true, year: '2017', y: (2*height)/5, banner: 'Australia holds the Ashes currently, after defeating England in the recent 2017 series.'},
    ];

    this.buttonClick = () => {
      this.setState({
        clicked: true,
      });

      let seriesIndex = 0;
      vis.selectAll(".arc-path")
          .data(exchangeData)
          .enter().append("path")
          .attr("transform", function (d) {
            return "translate(" + width/2 + "," + d.y + ")";
          })
          .attr("fill", function (d) {
            return d.color;
          })
          .attr("class", "arc-path")
          .transition()
          .delay(function (d, i) {
            return (i + 1) * 800;
          })
          .attrTween('d', function(d) {
            // increase opacity for the trophy holder
            d3.selectAll("." + (d.holder === 'ENG' ? 'ENG' : 'AUS') + "-circle")
                .transition()
                .attr("fill-opacity", 1.0);

            // increase win count for the trophy holder
            d3.selectAll("." + d.winner + "-win-count")
                .transition()
                .text(parseInt(d3.select("." + d.holder + "-win-count").text(), 10) + 1);

            // decrease opacity for the trophy looser
            d3.selectAll("." + (d.holder === 'ENG' ? 'AUS' : 'ENG') + "-circle")
                .transition()
                .attr("fill-opacity", 0.3);

            // show the banner text if required
            if (d.banner) {
              d3.select(".ic-ashes-banner")
                  .transition()
                  .text(d.banner + ' (' + d.year + ') ');
            }

            // update the series year
            d3.select(".ic-ashes-current-year")
                .attr('text-anchor', 'middle')
                .attr('font-family', 'arial')
                .text(d.year);

            // add bar for the series result
            barVis.selectAll(".ic-ashes-bar-group-bar")
                .data([d])
                .enter().append("rect")
                .attr("x", barPositionX + ((seriesIndex) * barWidth))
                .attr("y", 0)
                .attr("height", 30)
                .attr("width", barWidth)
                .attr("fill", function () {
                  if (d.winner === 'ENG') {
                    return '#2b4390'
                  } else if (d.winner === 'AUS') {
                    return '#cccc00'
                  } else if (d.winner === 'DRAW') {
                    return '#9c8e83'
                  }
                })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

            seriesIndex = seriesIndex + 1;

            // do not draw an arc if the same team (holder) won the series
            if (!d.process) {
              return;
            } else {
              // remove existing visible arcs
              d3.selectAll('.visible-arc')
                  .remove();

              // add the 'visible-arc' class to this element
              this.setAttribute('class', 'visible-arc');
            }

            const i = d3.interpolate(d.startAngle, d.endAngle);
            return function(t) {
              d.endAngle = i(t);
              return arc(d);
            }
          });
    }
  }

  render() {
    return (
        <div className="ic-ashes">
          <div className="ic-ashes-banner">
            The current holder of the trophy is highlighted and the count represents the total series won so far. An arc from Australia to England means England regaining the Ashes and vice-versa. Click the button below to start the interactive timeline.
          </div>
          <div className="ic-table-button">
            <button disabled={this.state.clicked} style={{
              opacity: this.state.clicked ? '0.2' : '1.0',
              cursor: this.state.clicked ? 'auto' : 'pointer',
            }} onClick={() => this.buttonClick()}>Start</button>
          </div>
          <div className="ic-ashes-bar-group-legend"/>
          <div className="ic-ashes-bar-group"/>
          <div className="ic-ashes-content"/>
        </div>
    );
  }
}

export default Ashes;