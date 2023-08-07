console.log('hello')

var $ = mdui.$;

$('#tab-story').on('click', function() {
  $('#container-clues').addClass('mdui-hidden');
  $('#container-story').removeClass('mdui-hidden');
});

$('#tab-clues').on('click', function() {
  $('#container-story').addClass('mdui-hidden');
  $('#container-clues').removeClass('mdui-hidden');
});

$('#button-search').on('click', function() {
  mdui.prompt('你要调查什么？',
    function(value) {
      mdui.alert('你输入了：' + value + '，点击了确认按钮');
    },
    function(value) {
      mdui.alert('你输入了：' + value + '，点击了取消按钮');
    },
    {
      maxlength: 4,
      confirmText: '调查',
      cancelText: '取消'
    }
  );
});

var instFab = new mdui.Fab('#button-clues-tools');
$('#button-clues-tools').on('click', function() {
  if (instFab.getState() == 'opened') instFab.close();
});

var instFlag = new mdui.Dialog('#dialog-flag');
$('button[data-type="button-clues-flag"]').on('click', function() {
  alert($(this).parents('div.mdui-panel-item').attr('id'));
  instFlag.open();
});