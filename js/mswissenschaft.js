/* globals d3: false, console: false, $: false */
(function(){
  'use strict';
  var w = 1920;
  var h = 1080;

  var data = {
    'S7': [
            ['2%', '85%'], ['5%', '='], ['+', '53%'], ['30.25%', '='],
            ['+', '36%'], ['59.75%', '='], ['+', '53%'], ['76.5%', '='],
            ['95%', '+'], ['98%', '=']
          ],
    'S2': [
            ['2%', '40%'], ['5%', '='], ['+', '52%'], ['30%', '='],
            ['+', '35%'], ['60%', '='], ['+', '52%'], ['90%', '='],
            ['95%', '-'], ['98%', '=']
          ],
    'S3': [
            ['5%', '5%'], ['=', '18%'], ['+', '51%'], ['29.75%', '='],
            ['+', '34%'], ['60.25%', '='], ['+', '51%'], ['76.5%', '='],
            ['95%', '-'], ['98%', '=']
    ],
    'S41': [
            ['65%', '24%'], ['+10%', '+'], ['=', '+20%'],
            ['-10%', '+'], ['-30%', '='], ['-10%', '-'], ['=', '-20%'],
            ['+10%', '-'], ['+30%', '=']
          ],
    'S42': [
            ['64.75%', '25%'], ['+9.7%', '+'], ['=', '+19%'],
            ['-9.7%', '+'], ['-29.5%', '='], ['-9.7%', '-'], ['=', '-19%'],
            ['+9.7%', '-'], ['+29.5%', '=']
          ],
    'U6': [
            ['62%', '5%'], ['60%', '5%'], ['-', '22%'], ['=', '52.25%'], ['60%', '+'], ['=', '96%']
          ],
    'U9': [
            ['38%', '5%'], ['40.35%', '5%'], ['+', '22%'], ['=', '52.25%'], ['30%', '+'],
            ['26%', '+'], ['23%', '=']
          ],
    'U7': [
            ['30%', '52%'], ['40%', '+'], ['68%', '='], ['83%', '+'], ['85%', '=']
          ]
  };

  var stations = {
    westkreuz: {
      x: parsePercent('24.25%', w),
      y: parsePercent('50%', h),
      height: 40,
      width: 35,
      delay: 500
    },
    ostkreuz: {
      x: parsePercent('74%', w),
      y: parsePercent('50%', h),
      height: 40,
      width: 35,
      delay: 1500
    },
    potsdam: {
      x: parsePercent('1%', w),
      y: parsePercent('83.5%', h),
      height: 30,
      width: 30,
      delay: 1
    },
    schoeneberg: {
      x: parsePercent('35%', w),
      y: parsePercent('76.5%', h),
      height: 35,
      width: 30,
      delay: 1000,
      rotate: '45'
    },
    steglitz: {
      x: parsePercent('22%', w),
      y: parsePercent('93.5%', h),
      height: 30,
      width: 30,
      delay: 1900,
    },
    neukoelln: {
      x: parsePercent('69%', w),
      y: parsePercent('69.5%', h),
      height: 30,
      width: 30,
      delay: 500,
      rotate: '45'
    },
    zoo: {
      x: parsePercent('29.5%', w),
      y: parsePercent('50%', h),
      height: 40,
      width: 30,
      delay: 500,
      // rotate: '45'
    },
    friedrichstrasse: {
      x: parsePercent('49.2%', w),
      y: parsePercent('33.25%', h),
      height: 40,
      width: 40,
      delay: 500,
      // rotate: '45'
    }
  };

  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('id', 'visualization')
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  function parsePercent(val, total) {
    if (val.indexOf && val.indexOf('%') !== -1) {
      val = parseFloat(val.substr(0, val.length - 1)) / 100 * total;
    }
    return parseFloat(val);
  }

  var generate = function(data){
    var newData = [], d;
    for (var i = 0; i < data.length; i += 1) {
      d = data[i].slice();

      if (d[0] === '=') {
        d[0] = newData[i - 1][0];
      }

      if (d[1] === '=') {
        d[1] = newData[i - 1][1];
      }

      if (d[0] === '+' || d[0] === '-') {
        d[1] = parsePercent(d[1], h);
        d[0] = newData[i - 1][0] + Math.abs(d[1] - newData[i - 1][1]) * (d[0] === '-' ? -1 : 1);
      }
      else if (d[0].indexOf && (d[0].indexOf('+') === 0 || d[0].indexOf('-') === 0)) {
        d[0] = newData[i - 1][0] + parsePercent(d[0].substr(1), w) * (d[0][0] === '+' ? 1 : -1);
      }
      if (d[1] === '+' || d[1] === '-') {
        d[0] = parsePercent(d[0], w);
        d[1] = newData[i - 1][1] + Math.abs(d[0] - newData[i - 1][0]) * (d[1] === '-' ? -1 : 1);
      }
      else if (d[1].indexOf && (d[1].indexOf('+') === 0 || d[1].indexOf('-') === 0)) {
        d[1] = newData[i - 1][1] + parsePercent(d[1].substr(1), h) * (d[1][0] === '+' ? 1 : -1);
      }

      d[0] = parsePercent(d[0], w);
      d[1] = parsePercent(d[1], h);

      d[0] = d[0] < 0 ? w + d[0] : d[0];
      d[1] = d[1] < 0 ? h + d[1] : d[1];

      newData.push(d);
    }
    return newData;
  };

  var line = d3.svg.line();

  var paths = {}, totalLength;

  for (var key in data) {
    data[key] = generate(data[key]);

    paths[key] = svg.append('path')
      .attr('d', line(data[key]))
      .attr('class', 'line ' + key);

    totalLength = paths[key].node().getTotalLength();

    paths[key]
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
        .duration(2000)
        .ease('linear')
        .attr('stroke-dashoffset', 0);

  }

  var station;
  for (var name in stations) {
    station = stations[name];
    svg.append('g')
      .attr('class', 'station ' + name)
      .attr('transform', 'translate(' + station.x + ' ' + station.y +') rotate(' + (station.rotate || '0') + ' 0 0)')
    .append('rect')
      .attr('width', station.width)
      .attr('height', station.height)
      .attr('rx', 5)
      .attr('ry', 5)
      .style('opacity', 0)
      // .style('-webkit-transform', 'rotate(' + (station.rotate || '0') + 'deg)')
      // .attr('transform', 'rotate(45)')
      .transition()
        .delay(station.delay || 500)
        .duration(1)
        .ease('linear')
        .style('opacity', 1);
    $('.' + name).popover({
      title: '<h1>Title</h1>',
      content: '<p>This is the super content here right here',
      html: true, container: 'body'
    });
  }

}());