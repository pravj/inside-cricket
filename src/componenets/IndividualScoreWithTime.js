import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';

/*
* http://webcache.googleusercontent.com/search?q=cache:EPiBoMbih30J:bleacherreport.com/articles/1948885-charting-the-history-of-the-highest-individual-odi-innings-score-ever+&cd=5&hl=en&ct=clnk&gl=in
* */

const highScores = [
  {
    index: 0,
    player: 'John Edrich',
    runs: 82,
    balls: 119,
    date: '01/05/1971',
    team: 'ENG',
  },
  {
    index: 1,
    player: 'Dennis Amiss',
    runs: 103,
    balls: 134,
    date: '08/24/1972',
    team: 'ENG',
  },
  {
    index: 2,
    player: 'Roy Fredericks',
    runs: 105,
    balls: 122,
    date: '09/07/1973',
    team: 'WI',
  },
  {
    index: 3,
    player: 'David Lloyd',
    runs: 116,
    balls: 159,
    date: '08/31/1974',
    team: 'ENG',
    notout: true,
  },
  {
    index: 4,
    player: 'Dennis Amiss',
    runs: 137,
    balls: 147,
    date: '06/07/1975',
    team: 'ENG',
  },
  {
    index: 5,
    player: 'Glenn Turner',
    runs: 171,
    balls: 201,
    date: '06/07/1975',
    team: 'NZ',
    notout: true,
  },
  {
    index: 6,
    player: 'Kapil Dev',
    runs: 175,
    balls: 138,
    date: '06/18/1983',
    team: 'IND',
    notout: true,
  },
  {
    index: 7,
    player: 'Viv Richards',
    runs: 189,
    balls: 170,
    date: '05/31/1984',
    team: 'WI',
    notout: true,
  },
  {
    index: 8,
    player: 'Saeed Anwar',
    runs: 194,
    balls: 146,
    date: '05/21/1997',
    team: 'PAK',
  },
  {
    index: 9,
    player: 'Charles Coventry',
    runs: 194,
    balls: 191,
    date: '08/16/2009',
    team: 'ZIM',
    notout: true,
  },
  {
    index: 10,
    player: 'Sachin Tendulkar',
    runs: 200,
    balls: 147,
    date: '02/24/2010',
    team: 'IND',
    notout: true,
  },
  {
    index: 11,
    player: 'Virender Sehwag',
    runs: 219,
    balls: 149,
    date: '12/08/2011',
    team: 'IND',
  },
  {
    index: 12,
    player: 'Rohit Sharma',
    runs: 264,
    balls: 225,
    date: '11/13/2014',
    team: 'IND',
  }
]

class IndividualScoreWithTime extends Component {
  static flagURL(country) {
    switch (country) {
      case 'IND':
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png'
      case 'SL':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/23px-Flag_of_Sri_Lanka.svg.png'
      case 'AUS':
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/23px-Flag_of_Australia.svg.png'
      case 'WI':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/WestIndiesCricketFlagPre1999.svg/23px-WestIndiesCricketFlagPre1999.svg.png'
      case 'NZ':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/23px-Flag_of_New_Zealand.svg.png'
      case 'PAK':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/23px-Flag_of_Pakistan.svg.png'
      case 'SA':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/23px-Flag_of_South_Africa.svg.png'
      case 'ENG':
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/23px-Flag_of_England.svg.png'
      case 'BAN':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/23px-Flag_of_Bangladesh.svg.png'
      case 'ZIM':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Flag_of_Zimbabwe.svg/23px-Flag_of_Zimbabwe.svg.png'
      default:
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/23px-Flag_of_Australia.png'
    }
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

    const verticalDiff = isSmallDevice ? 20 : 30;

    const width = pageWidth - (2 * padding.left);
    // const height = width * 1.5;
    const height = (isSmallDevice ? 28 : 19) * verticalDiff;

    const innerPadding = {
      left: 40,
      right: 40,
      bottom: 10,
    };

    const xStart = isSmallDevice ? 30 : 10;

    // unit width in the X direction
    const xUnitDistance = (width - xStart) / 300;

    let previousHeight = undefined;

    // create an svg container
    const vis = d3.select(".ic-individual-score").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // vertical axis lines
    const verticalLines = 4;
    const verticalLineValues = [100, 150, 200, 250];
    for (let i = 0; i < verticalLines; i++) {
      vis.append("text")
          .attr("x", -10 + verticalLineValues[i] * xUnitDistance)
          .attr("y", 15)
          .attr("font-weight", 'bold')
          .attr("font-size", '10px')
          .text('' + verticalLineValues[i]);

      vis.append('line')
          .attr('x1', verticalLineValues[i] * xUnitDistance)
          .attr('y1', 0)
          .attr('x2', verticalLineValues[i] * xUnitDistance)
          .attr('y2', height)
          .style("stroke-dasharray", ("1, 1"))
          .attr('stroke', 'black');
    }

    vis.selectAll(".personal-score")
        .data(highScores)
        .enter().append("rect")
        .attr("x", xStart * xUnitDistance)
        .attr("y", function (d, i) {
          if (previousHeight === undefined) {
            previousHeight = 40 * (i + 1);
          } else {
            const currentYear = parseInt(highScores[i].date.split('/')[2], 10);
            const pastYear = parseInt(highScores[i - 1].date.split('/')[2], 10);
            if (currentYear <= pastYear + 1) {
              previousHeight = previousHeight + 30;
            } else {
              previousHeight = previousHeight + (((currentYear - pastYear)/4) * 30);
            }
          }
          return previousHeight;
        })
        .attr("height", 2)
        .attr("fill", "#5E548E")
        .transition()
        .delay(function (d, i) {
          return (i + 1) * 500;
        })
        .attr("width", function (d) {
          return (d.runs - xStart) * xUnitDistance;
        })
        .on('start', function (d, i) {
          vis.append("svg:image")
              .attr('x', xStart * xUnitDistance)
              .attr('y', (this.getAttribute('y')) - 20)
              .attr('width', 20)
              .attr('height', 20)
              .attr("xlink:href", IndividualScoreWithTime.flagURL(d.team));

          vis.append("text")
              .attr("x", 0)
              .attr("class", "ic-individual-score-year")
              .attr("y", (this.getAttribute('y')) - 5)
              .attr("font-weight", 'bold')
              .attr("font-size", '10px')
              .text(d.date.split('/')[2]);

          vis.append("text")
              .attr("x", xStart * xUnitDistance + 30)
              .attr("y", (this.getAttribute('y')) - 5)
              .attr("font-weight", 'bold')
              .attr("font-size", '10px')
              .text(d.player);
        })
        .on('end', function (d, i) {
          const tip = d3tip().attr('class', 'd3-tip-box').offset([-10, 0]).html(function() {
            return "" + d.runs + (d.notout && d.notout === true ? '*' : '') + "";
          });

          tip.direction(function() {
            return 'e';
          });

          vis.call(tip);

          const l = vis.append("circle")
              .attr('cx', (d.runs) * xUnitDistance)
              .attr('cy', this.getAttribute('y'))
              .attr('opacity', 0)
              .attr('r', 3);

          tip.show(l.node());
        });
  }

  render() {
    return (
        <div className="ic-individual-score">
        </div>
    );
  }
}

export default IndividualScoreWithTime;