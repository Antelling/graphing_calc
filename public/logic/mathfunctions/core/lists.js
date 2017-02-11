function listMax(list) {
  return helper('list_max', arguments, 1, function (list) {
    return Math.max.apply(Math, list);
  }, true);
}
function listMin(list) {
  return helper('list_min', arguments, 1, function (list) {
    return Math.min.apply(Math, list);
  }, true);
}
function sort(list) {
  return helper('sort', arguments, 1, function (list) {
    return list.sort(function (a, b) {
      return a - b
    });
  }, true);
}
function gcf(list) {
  return helper('gcf', arguments, 1, function (list) {
    var smallest = Math.min.apply(Math, list);
    smallest.loop(function (num) {
      var divisible = true;
      list.loop(function (item) {
        if (!isDivisible(item, num)) {
          divisible = false;
        }
      });
      if (divisible) smallest = num;
    });
    return smallest;
  }, true);
}
function lcm(ar) {
  return helper('lcm', arguments, 1, function (ar) {
    if (ar.length > 1) {
      ar.push(slcm(ar.shift(), ar.shift()));
      return lcm(ar);
    } else {
      return ar[0];
    }
    function sgcf(a, b) {
      return ( b == 0 ) ? (a) : ( sgcf(b, a % b) );
    }

    function slcm(a, b) {
      return ( a / sgcf(a, b) ) * b;
    }
  }, true);
}
function median(list) {
  return helper('median', arguments, 1, function (list) {
    list = sort(list);
    while (list[2]) {
      list.push();
      list.pop();
    }
    //object is now one or two long
    if (list[1]) {
      return mean(list[0], list[1]);
    }
    return list[0];
  }, true);
}
function mode (list) {
  return helper('mode', arguments, 1, function (list) {
    var tracker = {};
    list.loop(function (item) {
      tracker[item.toString()] = 0;
    });
    list.loop(function (item) {
      tracker[item.toString()] += 1;
    });
    var greatest = [0, []];
    for (var prop in tracker) {
      if (tracker.hasOwnProperty(prop)) {
        if (tracker[prop] > greatest[0]) {
          greatest = [tracker[prop], [prop]];
        } else if (tracker[prop] === greatest[0]) {
          greatest[1].push(prop);
        }
      }
    }
    return greatest[1];
  }, true);
}
function mean(list) {
  return helper('mean', arguments, 1, function (list) {
    var total = 0;
    list.loop(function (i) {
      total += i;
    });
    return total / list.length;
  }, true);
}
function range(list) {
  return helper('range', arguments, 1, function (list) {
    return list_max(list) - list_min(list);
  }, true);
}
function std(list) {
  return helper('avg_diff', arguments, 1, function (list) {
    var listMean = mean(list);
    var diffList = [];
    list.loop(function (item) {
      diffList.push(Math.abs(listMean - item));
    });
    return mean(diffList);
  }, true);
}
