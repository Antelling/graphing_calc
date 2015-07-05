var colorList = ['#757C95', '#5C3A42', '#12100C', '#BCA3E6', '#31A1AD'];


function setUpWindow() {

  w.xRange = w.xMax - w.xMin;
  w.yRange = w.yMax - w.yMin;

  w.xInterval = w.xRange / w.xStep;
  w.yInterval = w.yRange / w.yStep;

  w.xPixStep = c.canvas.width / w.xInterval;
  w.yPixStep = c.canvas.height / w.yInterval;

  w.xUnitStep = w.xRange / c.canvas.width;
  w.yUnitStep = w.yRange / c.canvas.height;

  w.xZero = w.xMin * -1 * (c.canvas.width / w.xRange);
  w.yZero = w.yMin * -1 * (c.canvas.height / w.yRange);

  w.xConv = w.xRange / c.canvas.width;
  w.yConv = w.yRange / c.canvas.height;
}
//fills in window variables, to be called after window edited.

function setUpGraph() {

  c.c.clearRect (0, 0, c.canvas.width, c.canvas.height);
  c.c.strokeStyle = 'black';
  c.c.lineWidth = 1;
  c.c.beginPath();
  c.c.moveTo(w.xZero, 0);
  c.c.lineTo(w.xZero, c.canvas.height);
  c.c.moveTo(0, w.yZero);
  c.c.lineTo(c.canvas.width, w.yZero);
  c.c.stroke();

  c.c.beginPath();
  w.xInterval.loop(function (i) {
    var offset = w.xPixStep * i;
    c.c.moveTo(offset, w.yZero - 5);
    c.c.lineTo(offset, w.yZero + 5);
  });
  w.yInterval.loop(function (i) {
    var offset = w.yPixStep * i;
    c.c.moveTo(w.xZero - 5, offset);
    c.c.lineTo(w.xZero + 5, offset);
  });
  c.c.stroke();
}
//redraws graph, to be called if window changes, or an equation is changed or deleted.

function findAverageDifference(list) {
  var diff = [];
  var prev = list[0];
  list.loop(function(item) {
    diff.push(abs(item - prev));
    prev = item;
  });
  var newDiff = [];
  diff = sort(diff);
  for(var i = Math.floor(diff.length * s.lowerDiscard); i < diff.length * s.upperDiscard; i++) {
    newDiff.push(diff[i])
  }
  return mean(newDiff);
}
//used in deciding if jump is discontinuity

function graph(equation, color) {

  if (equation === '') {
    return;
  }
  //so we have two kinds of equations, right? Functions, and non functions. Functions will be connected with lines
  //and have discontinuities and things. Non functions have more than one point per x, so we won't draw lines.
  //so we need to check if it's a function. But first let's initialize some things.
  c.c.beginPath();
  c.c.lineWidth = 2;
  c.c.strokeStyle = colorList[color];
  c.c.fillStyle = c.c.strokeStyle;

  var total = 'var list=[]; var x = 0;';
  for (var i = 0; i <= c.canvas.width; i = i + (1/ s.graphingPrecision)) {
    var offset = w.xMin + w.xConv * i;
    total += 'x = ' + offset + '; list.push(' + equation + '); ';
  }

  eval(total);

  var xStep = c.canvas.width / list.length;
  //now we check if it's a function or not.
  if (isFunction(list)) {
    var allowableDiff = findAverageDifference(list) * s.allowableVariation;

    var prevY = -77777777;
    list.loop(function(y, i){
      var shouldGraph = true;
      var x = xStep * i;
      y = w.yZero - y / w.yConv;
      if (abs(y - prevY) > allowableDiff) {
        shouldGraph = false;
      }
      if (shouldGraph) {
        c.c.lineTo(x, y);
      } else {
        c.c.moveTo(x, y);
      }
      prevY = y;
    });
    c.c.stroke();
  } else {
    //We just graph every point.
    list.loop(function(points, i){
      x = w.xStep * i;
      if (points && typeof points === 'object') { //its a list
        points.forEach(function (y) {
          c.c.fillRect(x, w.yZero - y / w.yConv, 1, 1);
        });
      }
    });
  }
}
//graphs a single equation.

function isFunction (list) {
  var isFunc = true;
  list.loop(function(item){
    if (typeof item === 'object') {
      isFunc = false;
    }
  });
  return isFunc;
}
//determines if equations is function or relation
