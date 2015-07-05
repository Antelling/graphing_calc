String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

String.prototype.replaceLast = function (what, replacement) {
  return this.reverse().replace(what.reverse(), replacement.reverse()).reverse();
};

String.prototype.replaceAll = function (target, replacement) {
  return this.split(target).join(replacement);
};

String.prototype.findOcc = function (subString, allowOverlapping) {
  subString += "";
  if (subString.length <= 0) {
    return this.length + 1;
  }

  var n = 0, pos = 0;
  var step = (allowOverlapping) ? (1) : (subString.length);

  while (true) {
    pos = this.indexOf(subString, pos);
    if (pos >= 0) {
      n++;
      pos += step;
    } else break;
  }
  return (n);
};

String.prototype.contains = function (data) {
  return this.indexOf(data) !== -1;
};

String.prototype.splitFirst = function (string) {
  list = this.split(string);
  return [list.shift(), list.join(string)];
};

String.prototype.splitLast = function (string) {
  list = this.split(string);
  return [list.invPop().join(string), list.pop()];
};

String.prototype.is = function (list) {
  var is = false;
  var string = this.toString();
  list.forEach(function (item) {
    if (string === item) {
      is = true;
    }
  });
  return is;
};

String.prototype.firstWord = function () {
  var string = this.toString();
  return string.slice(0, string.indexOf(' '));
};

String.prototype.cut = function (start, end) {
  var string = this.toString();
  if (start === 0) {
    return string.slice(0, string.indexOf(end));
  } else if (end) {
    return string.slice(string.indexOf(start), string.indexOf(end));
  } else {
    return string.slice(string.indexOf(start) + 1);
  }
};

String.prototype.numLoop = function (func) {
  parseFloat(this).same(func);
};

String.prototype.loop = function (callback, persist) {
  if (typeof persist === 'undefined') {
    persist = '';
  }
  var i = 0;

  this.split('').some(function (item) {
    try {
      persist = callback(item, i, persist);
    } catch (e) {
      if (e === 'stop') {
        return true;
      } else {
        throw e;
      }
    }
    i++;
  });

  return persist;
};

String.prototype.splitCamel = function () {
  var list = [''];
  var currentWord = '';
  this.loop(function (letter) {
    if (letter !== letter.toLowerCase()) {
      list.push(letter);
    } else {
      list.push(list.pop() + letter);
    }
  });
  return list.clean();
};


Array.prototype.invPop = function () {
  this.pop();
  return this;
};

Array.prototype.invShift = function () {
  this.shift();
  return this;
};

Array.prototype.replace = function (string, newString) {
  var newArray = [];
  this.forEach(function (item) {
    newArray.push(item.replaceAll(string, newString));
  });
  return newArray;
};

Array.prototype.split = function (split) {
  var newArray = [];
  this.forEach(function (chunk) {
    chunk.split(split).forEach(function (chunk) {
      newArray.push(chunk);
    });
  });
  return newArray;
};

Array.prototype.clean = function () {
  var cleanArray = [];
  this.forEach(function (item) {
    if (item) {
      cleanArray.push(item);
    }
  });
  return cleanArray;
};

Array.prototype.replaceItem = function (data, replacer) {
  var newArray = [];
  this.forEach(function (item) {
    if (item === data) {
      newArray.push(replacer);
    } else {
      newArray.push(item);
    }
  });
  return newArray;
};

Array.prototype.indexOf = function (check) {
  var index = -1;
  var total = -1;
  this.some(function (item) {
    index++;
    if (item === check) {
      total = item;
      return true;
    }
  });
  return total;
};

Array.prototype.loop = function (callback, persist) {
  if (typeof persist === 'undefined') {
    persist = '';
  }
  var i = 0;
  this.some(function (item) {
    try {
      persist = callback(item, i, persist);
    } catch (e) {
      if (e === 'stop') {
        return true;
      } else {
        throw e;
      }
    }
    i++;
  });

  return persist;
};

Array.prototype.map = function (callback) {
  var newArray = [];
  this.loop(function (item) {
    newArray.push(callback(item));
  });
  return newArray;
};

Array.prototype.last = function () {
  return this[this.length - 1]
};

Array.prototype.removeDuplicates = function(){
  var list = this;
  var newList = [];
  var length = list.length;
  for(var i =0; i < length; i++) {
    var item = list.shift();
    if (!list.contains(item)){
      newList.push(item);
    }
  }
  return newList;
};

Array.prototype.contains = function(item) {
  return this.indexOf(item)!== -1;
};


Number.prototype.loop = function (callback, persist) {
  if (typeof persist === 'undefined') {
    persist = '';
  }
  for (var i = 1; i <= this; i++) {
    try {
      persist = callback(i, persist);
    } catch (e) {
      if (e === 'stop') {
        break;
      } else {
        throw e;
      }
    }
  }

  return persist;
};

Number.prototype.pow = function (exp) {
  return Math.pow(this, exp);
};

Number.prototype.fact = function () {
  var newNumb = 1;
  this.loop(function (number) {
    newNumb = newNumb * number;
  });
  return newNumb;
};


Boolean.prototype.test = function () {
  console.log('Extender is working');
};
