var e = Math.E;
var pi = Math.PI;
var tau = pi*2;
var bells = [1, 1, 2, 5, 15, 52, 203, 877, 4140, 21147, 115975, 678570, 4213597, 27644437, 190899322, 1382958545,
  10480142147, 82864869804, 682076806159, 5832742205057, 51724158235372, 474869816156751, 4506715738447323];
var phi = (1+Math.sqrt(5))/2;
var euler = 0.5772156649;
var primes = [];
function gen_primes(max) {
  primes = [];
  return helper('gen_primes', arguments, 1, function (max) {
    var sieve = [], i, j;
    for (i = 2; i <= max; ++i) {
      if (!sieve[i]) {
        // i has not been marked -- it is prime
        primes.push(i);
        for (j = i << 1; j <= max; j += i) {
          sieve[j] = true;
        }
      }
    }
    return primes[primes.length-1];
  });
}
