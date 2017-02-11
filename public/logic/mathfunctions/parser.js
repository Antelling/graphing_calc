function parse (equation) {
  equation = equation
    .replaceAll('!', '.fact()')
    .replaceAll('^', '.pow')
    .replaceAll('−', '-');  //this is a weird thing MathML puts instead of -

  //we need to replace a plain number followed by .pow or .fact with number.0 followed by .pow or .fact
  //isn't javascript great?

  /*match
    /34.pow
    \32.fact
    +23.fact

    do not match
    23.0.pow
    12.245643.fact

    so greedy match digits that do not contain a period and are not preceded by a period
   */
  var regex = /^(?!\.)\d+\.(pow|fact)/g;

  //replace 3a with 3*a
  equation = equation.split('');
  var length = equation.length - 1;
  for (var i = 0; i <length; i++) {
    if ((isNumber(equation[i]) && isLetter(equation[i + 1]) || isNumber(equation[i + 1]) && isLetter(equation[i]))) {
      equation[i + 1] = '*' + equation[i + 1]
    }
  }
  equation = equation.join('');

  return equation;
}
