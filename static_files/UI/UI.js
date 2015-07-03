$(window).load(function () {

  $('#loading').hide();
  $('#graphingCalc').show();
  $('.popup').hide();
  setMode('home');

  $('#homeButton').click(function(){setMode('home')});
  $('#graphButton').click(function(){setMode('graph')});
  $('#programButton').click(function(){setMode('program')});
});

function setMode(mode) {
  switch (mode) {
    case 'home':
    case 'normal':
      $('#graphingMode').hide();
      $('#programMode').hide();
      $('#homeMode').show();
      currentMode = 'home';
      break;

    case 'graph':
    case 'graphing':
      $('#graphingMode').show();
      $('#homeMode').hide();
      $('#programMode').hide();

      if (!s.showScriptBox) {
        $('#graphScriptBox').hide();
      } else {
        $('#graphScriptBox').show();
      }

      currentMode = 'graph';
      break;

    case 'program':
    case 'editor':
    case 'program editor':
    case 'programEditor':
      $('#programMode').show();
      $('#homeMode').hide();
      $('#graphMode').hide();

      currentMode = 'program';
      break;
  }
} //this set's the mode of the graphing calc
