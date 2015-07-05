function sec(n) {
  return helper('sec', arguments, 1, function (n) {
    return 1 / cos(n);
  });
}
function cot(n) {
  return helper('cot', arguments, 1, function (n) {
    return 1 / tan(n);
  });
}
function csc(n) {
  return helper('csc', arguments, 1, function (n) {
    return 1 / sin(n);
  });
}
function sin(n) {
  return helper('sin', arguments, 1, function (n) {
    return Math.sin(n);
  });
}
function tan(n) {
  return helper('tan', arguments, 1, function (n) {
    return Math.tan(n);
  });
}
function cos(n) {
  return helper('cos', arguments, 1, function (n) {
    return Math.cos(n);
  });
}

function acot(n, reps) {
  if(typeof reps === 'undefined') {
    reps = 1;
  }
  return helper('acot', arguments, 2, function (n) {
    return trigLoopHelper(reps, n, function(){
      return Math.atan(1 / n);
    });
  });
}
function acsc(n, reps) {
  if(typeof reps === 'undefined') {
    reps = 1;
  }
  return helper('acsc', arguments, 2, function (n) {
    return trigLoopHelper(reps, n, function() {
      return Math.asin(1 / n);
    });
  });
}
function asec(x, reps) {
  if(typeof reps === 'undefined') {
    reps = 1;
  }
  return helper('asec', arguments, 2, function (n) {
    return trigLoopHelper(reps, n, function() {
      return Math.acos(1 / x);
    });
  });
}
function acos(x, reps) {
  if(typeof reps === 'undefined') {
    reps = 1;
  }
  return helper('acos', arguments, 2, function (n) {
    return trigLoopHelper(reps, n, function(){
      return Math.acos(n);
    });
  });
}
function atan(x, reps) {
  if(typeof reps === 'undefined') {
    reps = 1;
  }
  return helper('atan', arguments, 2, function (n) {
    return trigLoopHelper(reps, n, function(){
      return Math.atan(n);
    });
  });
}
function asin(x, reps) {
  if(typeof reps === 'undefined') {
    reps = 1;
  }
  return helper('asin', arguments, 2, function (n) {
    return trigLoopHelper(reps, n, function(){
      return Math.asin(n);
    });
  });
}

function sinh(x) {
  return helper('sinh', arguments, 1, function (x) {
    return (Math.pow(E, x) - Math.pow(E, -x)) / 2
  });
}
function cosh(x) {
  return helper('cosh', arguments, 1, function (x) {
    return (Math.pow(E, x) + Math.pow(E, -x)) / 2
  });
}
function tanh(x) {
  return helper('tanh', arguments, 1, function (x) {
    return (Math.pow(E, x) - Math.pow(E, -x)) / (Math.pow(E, x) + Math.pow(E, -x));
  });
}
function coth(x) {
  return helper('coth', arguments, 1, function (x) {
    return (Math.pow(E, x) + Math.pow(E, -x)) / (Math.pow(E, x) - Math.pow(E, -x))
  });
}
function sech(x) {
  return helper('sech', arguments, 1, function (x) {
    return 2 / (Math.pow(E, x) + Math.pow(E, -x))
  });
}
function csch(x) {
  return helper('csch', arguments, 1, function (x) {
    return 2 / (Math.pow(E, x) - Math.pow(E, -x))
  });
}

function asinh(x) {
  return helper('asinh', arguments, 1, function (x) {
    return Math.log(x + Math.sqrt(x * x + 1));
  });
}
function acosh(x) {
  return helper('acosh', arguments, 1, function (x) {
    return Math.log(x + Math.sqrt(x * x - 1));
  });
}
function atanh(x) {
  return helper('atanh', arguments, 1, function (x) {
    return 0.5 * Math.log((1 + x) / (1 - x));
  });
}
function acoth(x) {
  return helper('acoth', arguments, 1, function (x) {
    return Math.log((x+1)/(x-1)) / 2
  });
}
function asech(x) {
  return helper('asech', arguments, 1, function (x) {
    return Math.log((Math.sqrt(1-x*x)+1) / x)
  });
}
function acsch(x) {
  return helper('acsch', arguments, 1, function (x) {
    return Math.log(1/x + Math.sqrt(1/(x*x) + 1))
  });
}


function trigLoopHelper(reps, value, func) {
  var list = [];
  value = func(value);

  var lower = -Math.floor(reps/2);
  var upper = Math.ceil(reps/2);

  for (var i = lower; i<upper; i++) {
    list.push(value+i*Tau);
  }

  if(!list[1]) {
    list = list.pop();
  }
  return list;
}
