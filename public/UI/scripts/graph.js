$(function () {
  c.canvas = document.getElementById('graph');
  c.c = document.getElementById('graph').getContext('2d');

  setUpWindow();
  setUpGraph();

  $('#consoleButton').click(function(){
    s.showScriptBox = !s.showScriptBox;
    setMode('graph');
  });

  $('#graphScriptBox').on('keyup', function(key){
    if (key.key === 'Enter') {
      eval($('#graphScriptBox').val());
    }
  });

  $('#graphScriptBox').mouseup(function(e){
    if (e.which === 3) {
      e.preventDefault();
      $('#graphScriptBox').hide();
    }
  });

  initializeWatchers();
});

function initializeWatchers() {

  $('.graphingInput').keyup(function (key) {
    switch (key.key) {
      case 'Enter':
        graphEquations();
        break;
    }
  });

  $('.graphingInput').click(function () {
    if (s.highlightOnClick) {
      this.select()
    }
  });

  $('.graphingInput:last').click(function () {
    $('.graphingInput:last').off();
    $('#graphingEquations').append('<input class="graphingInput" type="text">');
    destroyWatchers();
    initializeWatchers();
  });


  $('.graphingInput').mouseup(function(e){
    if (e.which === 3) {
      e.preventDefault();
      if ($('.graphingInput').length > 1 )
        $(this).remove();
    }
  })
}

function destroyWatchers () {
  $('.graphingInput').off();
}

function graphEquations() {
  var equations = [];

  $('.graphingInput').toArray().loop(function(item){
    equations.push(parse(item.value));
  });

  fillInTable(equations);

  var whatToGraph = determineWhatToGraph(equations, g.previous);

  if (whatToGraph[0]) {
    setUpGraph();
  }

  whatToGraph[1].loop(function (equation, i) {
    graph(equation, i);
  });
}

function determineWhatToGraph(current, previous) {
  return [true, current];
}

function fillInTable(equations) {
  var potList = 'var list = [], x;';
  for (var i = s.tableMin; i <= s.tableMax; i++) {
    potList += 'x=' + i + ';';
    potList += 'list.push([' + equations.join(', ') + ']);'
  }
  eval(potList);

  list = list.map(function(items) {
    return items.map(function(item){return round(item)});
  });

  var table = '<tr></th><th>X</th><th>' + equations.join('</th><th>') + '</th></tr>';

  var y = 0;
  for (i = s.tableMin; i <= s.tableMax; i++) {
    table += '<tr><td>' + i + '</td><td>' + list[y].join('</td><td>') + '</td>';
    y++;
  }

  $('#valueTable').html(table);
}
