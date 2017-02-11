$(function(){
  $('#fullscreenButton').click(function(){
    if (!u.isFullscreen) {
      u.isFullscreen = true;
      $('#graphingCalcContainer').addClass('fullscreen');
      $('.buttonButtons').addClass('dropup');
      c.canvas.width = document.body.clientWidth; //document.width is obsolete
      c.canvas.height = document.body.clientHeight; //document.height is obsolete
      c.c = document.getElementById('graph').getContext('2d');
      c.c.translate(.5,.5);
      setUpWindow();
      setUpGraph();
      graphEquations();
    } else {
      u.isFullscreen = false;
      $('#graphingCalcContainer').removeClass('fullscreen');
      $('.buttonButtons').removeClass('dropup');
      c.canvas.width = 550; //document.width is obsolete
      c.canvas.height = 550; //document.height is obsolete
      c.c = document.getElementById('graph').getContext('2d');
      c.c.translate(.5,.5);
      setUpWindow();
      setUpGraph();
      graphEquations();
    }
  });
});
