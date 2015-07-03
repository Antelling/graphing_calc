/*
 I totally stole this. Here's the license:

 Copyright (C) 2011-2013 Richard Ye
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function zeta(x) {
  if (x === 0) {
    return -0.5;
  } else if (x === 1) {
    return Infinity;
  } else if (x === 2) {
    return pi * pi / 6;
  } else if (x === 4) {
    return pi * pi * pi * pi / 90;
  } else if (x < 1) {
    return Infinity;
  }
  var sum = 4.4 * Math.pow(x, -5.1);
  for (var npw = 1; npw < 10; npw++) {
    sum += Math.pow(npw, -x);
  }
  return sum;
}

function gamma(x) {
  if (x > 1.0) {
    return (Math.exp(x * (Math.log(x) - 1) + 0.5 * (-Math.log(x) + log2pi) + 1 / (12 * x) - 1 / (360 * (x * x * x)) + 1 / (1260 * Math.pow(x, 5)) - 1 / (1680 * Math.pow(x, 7))));
  }
  if (x > -0.5) {
    return (1.0 + 0.150917639897307 * x + 0.24425221666910216 * Math.pow(x, 2)) / (x + 0.7281333047988399 * Math.pow(x, 2) - 0.3245138289924575 * Math.pow(x, 3));
  }
  if (x < 0) {
    if (x === ~~x) {
      return;
    } else {
      return Math.PI / (Math.sin(Math.PI * x) * gamma((1 - x)));
    }
  } else {
    return Math.pow(x - 1, x - 1) * Math.sqrt(2 * Math.PI * (x - 1)) * Math.exp(1 - x + 1 / (12 * (x - 1) + 2 / (5 * (x - 1) + 53 / (42 * (x - 1)))));
  }
}

function factorial(ff) {
  if (ff === 0 || ff === 1) {
    return 1;
  } else if (ff > 0 && ff === ~~ff && ff < 15) {
    var s = 1;
    for (var nns = 1; nns <= ff; nns++) {
      s *= nns;
    }
    return ~~s;
  } else if (ff != (~~ff) || ff < 0) {
    return gamma(ff + 1);
  }
}

function getBellNumber(x) {
  if (x === ~~x && x < bellNumbers.length) {
    return bellNumbers[x];
  } else {
    var sum = 0;
    for (var inj = 0; inj < 5; inj++) {
      sum += pow(inj, x) / factorial(inj);
    }
    return sum / Math.E;
  }
}

function getDerivative(f, xval) {
  /*
   * This is a brute force method of calculating derivatives, using
   * Newton's difference quotient (except without a limit)
   *
   * The derivative of a function f and point x can be approximated by
   * taking the slope of the secant from x to x+h, provided that h is sufficently
   * small. However, if h is too small, then floating point errors may result.
   *
   * This algorithm is an effective 100-point stencil in one dimension for
   * calculating the derivative of any real function y=equation.
   */
  var ddx = 0;

  //The suitable value for h is given at http://www.nrbook.com/a/bookcpdf/c5-7.pdf to be sqrt(eps) * x
  var x = xval;
  if (x > 1 || x < -1)
    var h = Math.sqrt(this.eps) * x;
  else
    h = Math.sqrt(this.eps);

  var answerx = f(x);
  for (var i = 1; i <= 50; i++) {
    var diff = (h * i);
    var inverseDiff = 1 / diff;

    //h is positive
    xval = x + diff;
    var answer = f(xval);
    ddx += (answer - answerx) * inverseDiff;

    //h is negative
    xval = x - diff;
    answer = f(xval);
    ddx += (answerx - answer) * inverseDiff;
  }

  return ddx / 100;
}
