//RANDOM
function rand_int(start, end) {
  return helper('rand_int', arguments, 2, function (start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  });
}

//FORMATTERS
function round(number) {
  return helper('round', arguments, 1, function (number) {
    number = number + '';
    var list = [''];
    var isNumber = false;
    number.loop(function (item) {
      if (!isNumber) {
        if (isNaN(item)) {
          list.push(list.pop() + item);
        } else {
          isNumber = true;
          list.push(item);
        }
      } else {
        if (isNaN(item) && item !== '.') {
          isNumber = false;
          list.push(item);
        } else {
          list.push(list.pop() + item);
        }
      }
    });

    isNumber = false;
    var total = '';
    list.loop(function (item) {
      if (isNumber) {
        total += Math.round(parseFloat(item) * 100000000) / 100000000;
      } else {
        total += item;
      }
      isNumber = !isNumber;
    });
    return total;
  });
}

//CHECKERS
function is_divisible(n1, n2) {
  return helper('is_divisible', arguments, 2, function (n1, n2) {
    return n1 % n2 === 0;
  });
}

//LOG
function ln(Expression) {
  return helper('ln', arguments, 1, function (Expression) {
    return Math.log(Expression);
  });
}
function log(base, val) {
  return helper('log', arguments, 2, function (base, val) {

    if (typeof val === 'undefined') {
      val = 10
    }
    return ln(base) / ln(val);
  });
}

//ROOT
function root(root, val, both) {
  return helper('root', arguments, 3, function (base, val, both) {
    if (val === false || val === true) {  //base is not specified, set it to two
      both = val;
      val = base;
      base = 2;
    } else if (typeof val === 'undefined') { //base nor both is specified, set it to two and false
      val = base;
      base = 2;
      both = true;
    }

    var isRootOdd = !is_divisible(base, 2);

    if (isRootOdd && val < 0) {
      return bad_nthroot(val, base);
    }

    var primary = Math.pow(val, 1 / base);

    if (isNaN(primary)) {
      return Math.pow(val * -1, 1 / base) + 'i';
    } else {
      var list = ['add all this', primary];
      if (!isRootOdd && both) {
        list.push(primary * -1);
      }
      return list;
    }
  });

  function bad_nthroot(x, n) {
    // If an error occurs, don't return anything.
    try {
      // If an error occurs
      // Loop through the nth root algorithm until no difference is found.
      var x2, n1 = n - 1, itersLeft = 99;
      do {
        x2 = x;
        x = (n1 * x2 + x / Math.pow(x2, n1)) / n;
      } while(x != x2 && itersLeft--);

      // If less than 100 iterations were done or if the difference between the
      // previous approximation and the current one is acceptable, return the
      // current one.
      if((itersLeft || (Math.abs(x - x2) < 1 && (x < 0) == (x2 < 0))) && isFinite(x))
        return x;
    } catch(E){}
  }
}

//AUTOMATERS
function pythag(a, b, c) {
  return helper('pythag', arguments, 3, function (a, b, c) {
    if (a === null || b === null) {
      if (a === null) {
        a = b;
        b = null;
      }
      a = Math.pow(a, 2);
      c = Math.pow(c, 2);
      c = c - a;
      return Math.sqrt(c);
    } else {
      return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
  });
}
