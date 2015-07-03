var Ans = [];

$(window).load(function () {

  $('#homeInput').keyup(function (key) {
    switch (key.key) {
      case 'Enter':
        var val = $('#homeInput').val();
        updateHomeLeft(parse(val));
        try{
          var compVal = round(eval(parse(val)));
          if (typeof compVal !== 'undefined') {
            updateHomeRight(compVal);
            Ans.unshift(compVal);
          }
        } catch (e) {
          updateHomeRight(e);
          Ans.unshift(compVal);
        }

        $('#homeInput').select();

        var objDiv = document.getElementById("homeOutput");
        objDiv.scrollTop = objDiv.scrollHeight;

        h.history.unshift(val);
        h.placeInHistory = -1;

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        break;

      case 'ArrowUp':
        if (typeof h.history[h.placeInHistory + 1] !== 'undefined') {
          h.placeInHistory++;
          $('#homeInput').val(h.history[h.placeInHistory]);
        }
        break;
      case 'ArrowDown':
        if (typeof h.history[h.placeInHistory - 1] !== 'undefined') {
          h.placeInHistory--;
          $('#homeInput').val(h.history[h.placeInHistory]);
          break;
        }
        break;
    }
  });

  $('#homeInput').click(function () {
    if (s.highlightOnClick) {
      $(this).select()
    }
  });

  function updateHomeLeft(val) {
    $('#homeOutput').append('<p>\\(' + val + '\\)</p>');
  }

  function updateHomeRight(val) {
    $('#homeOutput').append('<p class="text-right">\\(' + val + '\\)</p>');
  }

});
