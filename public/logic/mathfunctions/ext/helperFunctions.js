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
