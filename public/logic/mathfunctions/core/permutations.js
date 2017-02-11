function npr(n, r) {
  return helper('npr', arguments, 2, function (n, r) {
    return factorial(n) / factorial(r);
  });
}
function rnpr(n, r) {
  return helper('rnpr', arguments, 2, function (n, r) {
    return Math.pow(n, r);
  });
}
function ncr(n, r) {
  return helper('ncr', arguments, 2, function (n, r) {

    return factorial(n) / (factorial(r) * factorial(n - r));
  });
}
function rncr(n, r) {
  return helper('rncr', arguments, 2, function (n, r) {
    return factorial(n + r - 1) / (factorial(r) * factorial(n - 1));
  });
}
