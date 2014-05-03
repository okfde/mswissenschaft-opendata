/* globals d3: false, $: false */
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
            ['60%', '0%'], ['60%', '5%'], ['-', '22%'], ['=', '52.25%'], ['60%', '+'], ['=', '100%']
          ],
    'U9': [
            ['40.35%', '0%'], ['40.35%', '5%'], ['+', '22%'], ['=', '52.25%'], ['30%', '+'],
            ['20%', '+']
          ],
    // 'U7': [
    //         ['30%', '52%'], ['40%', '+'], ['68%', '='], ['83%', '+'], ['85%', '=']
    //       ]
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
    spandau: {
      x: parsePercent('1%', w),
      y: parsePercent('38.5%', h),
      height: 30,
      width: 30,
      delay: 1
    },
    ruhleben: {
      x: parsePercent('4.2%', w),
      y: parsePercent('2%', h),
      height: 30,
      width: 30,
      delay: 1
    },
    // oranienburg: {
    //   x: parsePercent('37%', w),
    //   y: parsePercent('3.5%', h),
    //   height: 30,
    //   width: 30,
    //   delay: 1
    // },
    // bernau: {
    //   x: parsePercent('61%', w),
    //   y: parsePercent('3.5%', h),
    //   height: 30,
    //   width: 30,
    //   delay: 1
    // },
    schoeneberg: {
      x: parsePercent('35%', w),
      y: parsePercent('76.5%', h),
      height: 35,
      width: 30,
      delay: 1000,
      rotate: '45'
    },
    // berlinerstrasse: {
    //   x: parsePercent('40%', w),
    //   y: parsePercent('67.5%', h),
    //   height: 35,
    //   width: 30,
    //   delay: 300,
    //   rotate: '45'
    // },
    // mehringdamm: {
    //   x: parsePercent('59.25%', w),
    //   y: parsePercent('68%', h),
    //   height: 30,
    //   width: 30,
    //   delay: 1400,
    // },
    tempelhof: {
      x: parsePercent('59.25%', w),
      y: parsePercent('77.5%', h),
      height: 30,
      width: 30,
      delay: 1600,
    },
    // altmariendorf: {
    //   x: parsePercent('59.25%', w),
    //   y: parsePercent('95%', h),
    //   height: 30,
    //   width: 30,
    //   delay: 2000,
    // },
    // rudow: {
    //   x: parsePercent('85%', w),
    //   y: parsePercent('95%', h),
    //   height: 30,
    //   width: 30,
    //   delay: 2000,
    // },
    // steglitz: {
    //   x: parsePercent('22%', w),
    //   y: parsePercent('93.5%', h),
    //   height: 30,
    //   width: 30,
    //   delay: 1900,
    // },
    // neukoelln: {
    //   x: parsePercent('69%', w),
    //   y: parsePercent('69.5%', h),
    //   height: 30,
    //   width: 30,
    //   delay: 500,
    //   rotate: '45'
    // },
    // zoo: {
    //   x: parsePercent('29.5%', w),
    //   y: parsePercent('50%', h),
    //   height: 40,
    //   width: 30,
    //   delay: 500,
    // },
    friedrichstrasse: {
      x: parsePercent('49.1%', w),
      y: parsePercent('33.25%', h),
      height: 40,
      width: 40,
      delay: 500,
    },
    erkner: {
      x: parsePercent('97%', w),
      y: parsePercent('84.5%', h),
      height: 30,
      width: 30,
      delay: 2000,
    },
    hoenow: {
      x: parsePercent('97%', w),
      y: parsePercent('41.5%', h),
      height: 30,
      width: 30,
      delay: 2000,
    },
    ahrensfelde: {
      x: parsePercent('97%', w),
      y: parsePercent('16.5%', h),
      height: 30,
      width: 30,
      delay: 2000,
    },
    gesundbrunnen: {
      x: parsePercent('49.5%', w),
      y: parsePercent('23%', h),
      height: 30,
      width: 30,
      delay: 400,
    },
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

  var displayModal = function(name){
    return function(){
      $('.modal .modal-title').text($('#' + name + ' > h1').text());
      $('.modal .modal-body').html($('#' + name + ' > div').html());
      $('#modal').modal('show');
      svg.selectAll('.' + name).classed('seen', true);
    };
  };

  $(document).on('hidden.bs.modal', function(){
    if ($('.station:not(.seen)').length === 0) {
      initPlan();
    }
  });

  var initPlan = function(){
    if (tm) {
      tm = window.clearTimeout(tm);
    }
    svg.selectAll('*').remove();
    $('.line-label.begin-hidden').addClass('hide');

    var paths = {}, totalLength;

    var unhideLabels = function(){
      $('.line-label.begin-hidden').removeClass('hide');
    };

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
          .attr('stroke-dashoffset', 0)
          .each('end', unhideLabels);
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
        .on('mousedown', displayModal(name))
        .transition()
          .delay(station.delay || 500)
          .duration(1)
          .ease('linear')
          .style('opacity', 1);
    }
  };

  if (window.navigator.userAgent.indexOf('Chromium') !== -1) {
    $('body').css({
      cursor: 'none'
    });
  }
  $(window).on('focus', initPlan);

  var tm = window.setTimeout(initPlan, 500);

}());
