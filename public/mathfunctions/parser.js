function parse (equation) {
  var eq = equation
    .replaceAll('!', '.fact()')
    .replaceAll('^', '.pow')
    .replaceAll('−', '-');  //tis is a weird thing MathML puts instead of -

  //replace AaB with Aa * B
  equation = '';
  var inWord = false;
  var currItem = '';
  eq.loop(function(char) {
    if(isLetter(char)){
      if(inWord) {
        currItem += char;
      } else {
        inWord = true;
        equation += currItem;
        currItem = char;
      }
    } else {
      if(inWord) {
        equation += currItem.splitCamel().join('*');
        currItem = char;
        inWord = false;
      } else {
        currItem += char;
      }
    }
  });
  equation += inWord ? currItem.splitCamel().join('*') : currItem;

  //replace 3a with 3*a
  equation = equation.split('');
  var length = equation.length - 1;
  for (var i = 0; i <length; i++) {
    if ((isNumber(equation[i]) && isLetter(equation[i + 1]) || isNumber(equation[i + 1]) && isLetter(equation[i]))) {
      equation[i + 1] = '*' + equation[i + 1]
    }
  }
  equation = equation.join('');

  //fill in the values for Answer[n]
  equation = (' ' + equation).split('Answer[');
  eq = equation.shift();
  equation.loop(function(item) {
    item = item.splitFirst(']');
    eq += Answer[Number(item[0])];
    eq += item[1];
  });

  return eq;
}
