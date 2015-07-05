var totalPressed = 0;

$(function () {
  var map = []; // Or you could call it "key"
  onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    totalPressed += e.type == 'keydown' ? 1 : -1;

    if (totalPressed === 0) {
      map = [];
    }

    if (map[18] && map[71]) { // alt g
      setMode('graph');

      return false;
    } else if (map[18] && map[72]) { // alt h
      setMode('home');

      return false;
    } else if (map[18] && map[83]) { // alt s
      $('#settingsPopup').toggle();
      saveSettings();

      return false;
    } else if (map[18] && map[70]) { //alt f
      $('#fullscreenButton').click();

      return false;
    } else if (map[18] && map[67]) { //alt c
      $('#consoleButton').click();

      return false;
    }else if (map[18] && map[87]) { //alt w
      $('#windowButton').click();
      saveWindow();
      return false;
    }else if (map[18] && map[84]) { //alt t
      $('#tableButton').click();

      return false;
    }else if (map[18] && map[69]) { //alt e
      switch (currentMode) {
        case 'home':
          $('#homeInput').click();
          break;
        case 'graph':
          $('.graphingInput:first').click();
      }

      return false;
    }else if (map[18] && map[68]) { //alt t
      $('#docsButton').click();

      return false;
    }
  };

  window.setInterval(function(){map = []}, 5000);
});
