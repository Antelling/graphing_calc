$(function(){

  //settings
  $('#settingsButton').click(function (){
    $('#settingsPopup').toggle();
  });

  $('#settingsSaveButton').click(function(){
    $('#settingsPopup').toggle();
    saveSettings();
    setMode(currentMode);
  });



  //docs
  $('#docsButton').click(function(){
    $('#docsPopup').toggle();
  });

  $('#docsCloseButton').click(function(){
    $('#docsPopup').toggle();
  });



  //window
  $('#windowButton').click(function(){
    $('#windowPopup').toggle();
    $('#xMin').focus();
  });

  $('#windowSaveButton').click(function(){

    saveWindow();

    $('#windowPopup').hide();

    setUpWindow();
    setUpGraph();

    setMode(currentMode);
  });



  //table
  $('#tableButton').click(function(){
    $('#tablePopup').toggle();
  });

  $('#tableCloseButton').click(function(){
    $('#tablePopup').toggle();
  })
});

function saveSettings(){
  s.highlightOnClick = $('#shouldHighlightOnClick').prop('checked');
  s.graphMode = $('#whatGraphingMode').val();
  s.tableMin = Number($('#tableMin').val());
  s.tableMax = Number($('#tableMax').val());
  s.lowerDiscard = Number($('#lowerDiscard').val());
  s.upperDiscard = Number($('#upperDiscard').val());
  s.allowableVariation = Number($('#allowableVariation').val());
  s.graphingPrecision = Number($('#graphingPrecision').val());
}

function saveWindow(){
  w.xMax = Number($('#xMax').val());
  w.xMin = Number($('#xMin').val());
  w.xScale = Number($('#xScale').val());
  w.yMax = Number($('#yMax').val());
  w.yMin = Number($('#yMin').val());
  w.yScale = Number($('#yScale').val());
}
