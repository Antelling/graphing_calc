//takes everything I might need in Math, and puts it in Window

var m = 'abs atan2 ceil exp floor max min pow random'.split(' ').loop(
  function (item) {
    window[item] = Math[item];
  }
);
