// 代码简化
function d(input) {
  console.debug(input);
}
var DEBUG = 1;
if (DEBUG) d('=== 调试信息 ===');
var $ = mdui.$;

$('#tab-story').on('click', function () {
  $('#container-clues').addClass('mdui-hidden');
  $('#container-story').removeClass('mdui-hidden');
});

$('#tab-clues').on('click', function () {
  $('#container-story').addClass('mdui-hidden');
  $('#container-clues').removeClass('mdui-hidden');
});

$('#button-search').on('click', function () {
  mdui.prompt('你要调查什么？',
    function (value) {
      mdui.alert('你输入了：' + value + '，点击了确认按钮');
    },
    function (value) {
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
$('#button-clues-tools').on('click', function () {
  if (instFab.getState() == 'opened') instFab.close();
});

// 线索标识对话框功能
var instFlag = new mdui.Dialog('#dialog-flag');
$('button[data-type="button-clues-flag"]').on('click', function () {
  let clueId = $(this).parents('div.mdui-panel-item').attr('id');
  if (DEBUG) d('clueId: ' + clueId);
  $('button[id^="dialog-flag-button-"').off('click');
  $('button[id^="dialog-flag-button-"').on('click', function () {
    if (DEBUG) d('移除标签颜色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
    $('#' + clueId).find('i[data-type="flag"]').removeClass(function (index, className) { return (className.match (/(^|\s)mdui-text-color-\S+/g) || []).join(' ');});
    if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
    switch ($(this).attr('id')) {
      case 'dialog-flag-button-none':
        if (DEBUG) d('selected ' + clueId + ' none');
        if (DEBUG) d('增加标签隐藏类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-hidden');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        break;
        case 'dialog-flag-button-red':
        if (DEBUG) d('selected ' + clueId + ' red');
        if (DEBUG) d('移除标签隐藏类名，增加红色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').removeClass('mdui-hidden');
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-text-color-red');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        break;
        case 'dialog-flag-button-green':
        if (DEBUG) d('selected ' + clueId + ' green');
        if (DEBUG) d('移除标签隐藏类名，增加绿色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').removeClass('mdui-hidden');
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-text-color-green');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        break;
        case 'dialog-flag-button-blue':
        if (DEBUG) d('selected ' + clueId + ' blue');
        if (DEBUG) d('移除标签隐藏类名，增加蓝色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').removeClass('mdui-hidden');
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-text-color-blue');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        break;
    }
  });
  instFlag.open();
});