/*
Let's start with the algorithm. Hm.
  Find the amount of vars, and the amount of solutions they want.
  Set all the vars to a number except one which you solve for.
  Solve for it. Have enough solutions? No? Keep moving forward.
  And this is how we solve for it:
  First, check from -99999999 to 99999999 with 10000000 intervals
  Take the closest interval and exact between them.
  More.
  More.
  Are we exact to .00000001? No?
  More.
  More.
  Oh look, two solutions in here.
  More More.
  Ayy, there we go. Okay.
*/

function solve (equation, requiredSolutions) {
  if(typeof requiredSolutions === 'undefined') {
    requiredSolutions =  1;
  }
  //so first, we find all the vars in the equation. A var is any letter or string that starts with a capital.
  var vars = determineVars(equation);

  //okay, now we need to set all the variables equal to a value except one and solve for it. So let's have a list of
  //values to try for, and loop through them until we have enough solutions.
  var likelyValues = [0, 1, -1, 2, -2, 10, -10, Pi, -Pi, 3, -3, 4, -4, Tau, -Tau, Pi/2, -Pi/2];
  var solutions = [];
  while (solutions.length < requiredSolutions) {
    //okay, now we set all vars equal to whatever value we're on now, except for a chosen variable we solve for.
    //so we grab the value we set every variable to:
    var value = likelyValues.shift() + '';
    //make a new instance of equation:
    var newEquation = equation;
    //loop through all known vars:
    vars.loop(function(solveVar){
      //loop through all known vars, except the one we are solving for right now:
      vars.replaceItem(solveVar, '').clean().loop(function(vari){
        //replace the var with the value
        newEquation = newEquation.replace(vari, value);
      });

      //okay, so now we only have one variable. Let's solve for it.

      var solution = singleVarSolve(solveVar, newEquation);
      if (typeof solution !== 'undefined') solutions.push(solution);
    });
  }
}

function determineVars (equat) {
  var vars = [];
  var word = '';
  equat = equat + 7; //this is to pop us out of any vars at the end
  equat.loop(function(char){
    if (isLetter(char)){ //the character is a letter
      if (word) {  //the character is a letter, and we are in a word
          word += char;
      } else { //the character is a letter, we are not in a word
        word += char;
      }
    } else { //the character is not a letter
      if (word) {  //the character is not a letter, this is the end of a word
        vars.push(word);
        word = '';
      }  //we don't need to do anything if it's not ending a word.
    }
  });


  vars = vars
    .removeDuplicates()
    .replace('E', '')
    .replace('Pi', '')
    .replace('Tau', '')
    .replace('Bells', '')
    .replace('Phi', '')
    .replace('Euler', '')
    .replace('Primes', '')
    .replace('i', '')
    .replace('Answer', '')
    .clean();


  return vars;
}

function singleVarSolve (v, eq) {
  //now, the equation is solved when one side minus the other is zero. However, we can have more than one side. so
  //instead of a-b = 0, it would be b-a + c-a + d-a = 0;
  eq = eq.split('=');
  var a = eq.pop(); //last part. Normally simpler. I could go through and time which part takes the shortest, but meh.
  var exp = [];
  eq.loop(function(item){
    exp.push('(('+item+')-('+a+'))');
  });
  exp.join(' + '); //so now exp has no equal. It is intended to evaluate to zero.

  //okay, so now we have only one var. First, we bomb it. Bombing will return the regions we should exact.
  var region = bomb(v, exp);

  return 1;
}

function bomb (v, e) {
  //okay. So first, we want to sweep over the whole thing. Lets start at -900,000,000,000 and go to 900,000,000,000
  //so we only want to call eval once. Let's make a generated list.
  var psuedo = [];
  for(var i = -9000000000; i <= 9000000000; i+=(100000000)) {
    psuedo.push(e.replaceAll(v, i));
  }
  psuedo = eval('[' + psuedo.join(',') + ']');
  //okay. Now we need to know all the places it intersects zero. If it intersects a lot, it's either a sinusoid or close
  //enough to one we can treat it like one. If it only intersects once, it's a normal function. If it intersects twice
  //or three times, it's a normal function with massive values. If it has no intersections, we probably aren't precise
  //enough, just call exact on the lows. Or it has no solutions, which would suck.
  var temporaryContainer = examineCurve(psuedo);
  var intersections = temporaryContainer[0];
  var lows = temporaryContainer[1];

  //first off, intersections and lows gave us a list of indexes, not x values. We want x values here. Thats' easy enough
  intersections = intersections.map(function(list){return list.map(function(num){ return num * 100000000-})})
  //first, let's see if it has a lot of solutions and lows. Let's say, 5? That's probably sufficient with the high
  //values we are using. If it has a high amount, It is a sinusoid and probably has many solutions at zero. Let's start
  //there, than return the other regions. If it isn't a sinusiod, return solutions then lows.



}

function exact (e) {

}

function examineCurve(points) {
  //so if I switch from negative to positive or positive to negative, it's a solution, if I switch from descending
  //to ascending and it's positive it's a local low, and if I switch from ascending to descending and it's negative
  //it's a local high. Which I'm going to call a low.
  var solutions = [];
  var lows = [];

  var ascending = points[0] < points[1];
  var prev = points[0];

  points.loop(function(item, i){
    if (Math.abs(item + prev) < Math.abs(item) + Math.abs(prev) || item === 0){ //it crossed zero, or item is zero
      solutions.push([i-1, i]);
    } else if ((item > 0 && item > prev && !ascending) || (item < 0 && item < prev && ascending)) {
      //its either positive and started ascending, or negative and started descending
      lows.push([i-2, i]);
    }
    ascending = item>prev;
    prev = item;
  });
  return [solutions, lows];
}

console.log(solve('8*var * x/y+E=12', 20));
