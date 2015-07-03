function niceArgs(arg) {
  return Array.prototype.slice.call(arg);
}

function isLetter (char) {
  return 'abcdefghijklmnopqrstuvwxyz'.contains(char.toLowerCase());
}

function isNumber (char) {
  return '1234567890'.contains(char);
}

function isCapital (char) {
  return char !== char.toLowerCase();
}

/*Maybe add in the future when I'm smarter:
  * Regressions
  *   - logistic
  *   - quadratic
  *   - quartic
  *   - sinusoidal
  *   - line of best fit
  * Algebra
  *   - solve
  *   - factor
  *   - zeros
  *   - intersection
  *   - root
  * Calculus
  *   - integrate
*/

