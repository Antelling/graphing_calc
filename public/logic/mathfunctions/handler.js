//HANDLER FUNCTION FOR ERRORS AND CRAP
function helper(name, args, pass, func, takeList) {
  var argList = [];
  if (!takeList) {
    if (args[0].constructor === Array) {
      args[0].loop(function (item) {
        argList.push(item)
      });
    } else {
      for (var prop in args) {
        if (args.hasOwnProperty(prop)) {
          argList.push(args[prop]);
        }
      }
    }
  } else {
    for (prop in args) {
      if (args.hasOwnProperty(prop)) {
        argList.push(args[prop]);
      }
    }
  }

  var output = [];

  while (typeof argList[0] !== 'undefined') {
    args = [];
    pass.loop(function () {
      args.push(argList.shift());
    });
    try {
      var result = func.apply(this, args);
      if (result[0] !== 'add all this') {
        output.push(result);
      } else {
        result.invShift().loop(function (item) {
          output.push(item)
        });
      }
    } catch (E) { //it did not work, let us not care.
      output.push(name + '(' + args.join(', ') + ')');
    }
  }
  if (output.length === 1) {
    output = output[0];
  }
  return output;
}
