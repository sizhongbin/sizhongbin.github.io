/* 
 * 代码简化
 */
function d(input) {
  console.debug(input);
}
var DEBUG = 1;
if (DEBUG) d('=== 调试信息 ===');
var $ = mdui.$;

/* 
 * 存档初始化
 */
if (!localStorage.r) localStorage.r = '[]';
if (!localStorage.g) localStorage.g = '[]';
if (!localStorage.b) localStorage.b = '[]';
if (!localStorage.s) localStorage.s = '[]';
if (!localStorage.c) localStorage.c = '[]';

/*
 * 故事标签卡功能
 */
$('#tab-story').on('click', function() {
  $('#container-clues').addClass('mdui-hidden');
  $('#container-story').removeClass('mdui-hidden');
});

/*
 * 线索标签卡功能
 */
$('#tab-clues').on('click', function() {
  $('#container-story').addClass('mdui-hidden');
  $('#container-clues').removeClass('mdui-hidden');
});

/*
 * 故事-检索按钮功能
 */
$('#button-story-search').on('click', function() {
  mdui.prompt('从故事中检索关键词，获取线索。',
    function(value) {
      mdui.alert('你输入了：' + value + '，点击了确认按钮');
    },
    function(value) {
      mdui.alert('你输入了：' + value + '，点击了取消按钮');
    },
    {
      maxlength: 4,
      confirmText: '检索',
      cancelText: '取消'
    }
  );
});

/*
 * 线索-筛选按钮功能
 */
var instFab = new mdui.Fab('#button-clues-tools');
$('#button-clues-tools').on('click', function() {
  if (instFab.getState() == 'opened') instFab.close();
});

/*
 * 线索标识对话框功能
 */
var instFlag = new mdui.Dialog('#dialog-flag');
$('button[data-type="button-clues-flag"]').on('click', function() {
  let clueId = $(this).parents('div.mdui-panel-item').attr('id');
  if (DEBUG) d('clueId: ' + clueId);
  $('button[id^="dialog-flag-button-"').off('click');
  $('button[id^="dialog-flag-button-"').on('click', function() {
    if (DEBUG) d('移除标签颜色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
    $('#' + clueId).find('i[data-type="flag"]').removeClass(function(index, className) { return (className.match(/(^|\s)mdui-text-color-\S+/g) || []).join(' '); });
    if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
    switch ($(this).attr('id')) {
      case 'dialog-flag-button-none':
        if (DEBUG) d('selected ' + clueId + ' none');
        if (DEBUG) d('增加标签隐藏类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-hidden');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        changeFlag(clueId, 'none');
        instFlag.close();
        break;
      case 'dialog-flag-button-red':
        if (DEBUG) d('selected ' + clueId + ' red');
        if (DEBUG) d('移除标签隐藏类名，增加红色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').removeClass('mdui-hidden');
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-text-color-red');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        changeFlag(clueId, 'red');
        instFlag.close();
        break;
      case 'dialog-flag-button-green':
        if (DEBUG) d('selected ' + clueId + ' green');
        if (DEBUG) d('移除标签隐藏类名，增加绿色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').removeClass('mdui-hidden');
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-text-color-green');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        changeFlag(clueId, 'green');
        instFlag.close();
        break;
      case 'dialog-flag-button-blue':
        if (DEBUG) d('selected ' + clueId + ' blue');
        if (DEBUG) d('移除标签隐藏类名，增加蓝色类名。Before: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        $('#' + clueId).find('i[data-type="flag"]').removeClass('mdui-hidden');
        $('#' + clueId).find('i[data-type="flag"]').addClass('mdui-text-color-blue');
        if (DEBUG) d('After: ' + $('#' + clueId).find('i[data-type="flag"]').attr('class'));
        changeFlag(clueId, 'blue');
        instFlag.close();
        break;
    }
  });
  instFlag.open();
});

/*
 * 从本地存储中修改一条线索的标识记录
 */
function changeFlag(clueId, color) {
  // 获取本地存储
  let redList = JSON.parse(localStorage.r),
    greenList = JSON.parse(localStorage.g),
    blueList = JSON.parse(localStorage.b);

  // 删除ID所有标识记录
  if (redList.indexOf(clueId.split('-')[1]) != -1) redList.splice(redList.indexOf(clueId), 1);
  if (greenList.indexOf(clueId.split('-')[1]) != -1) greenList.splice(greenList.indexOf(clueId), 1);
  if (blueList.indexOf(clueId.split('-')[1]) != -1) blueList.splice(blueList.indexOf(clueId), 1);

  // ID加入指定颜色标识记录
  switch (color) {
    case 'red':
      redList.push(clueId.split('-')[1]);
      break;
    case 'green':
      greenList.push(clueId.split('-')[1]);
      break;
    case 'blue':
      blueList.push(clueId.split('-')[1]);
      break;
  }

  // 回写至本地储存
  localStorage.r = JSON.stringify(redList);
  localStorage.g = JSON.stringify(greenList);
  localStorage.b = JSON.stringify(blueList);
}

/*
 * 页面加载完成后读档
 */
window.onload = function() {
  // 标识读取
  let redList = JSON.parse(localStorage.r),
    greenList = JSON.parse(localStorage.g),
    blueList = JSON.parse(localStorage.b);
  redList.forEach((element) => {
    $('#clue-' + element).find('i[data-type="flag"]').removeClass('mdui-hidden');
    $('#clue-' + element).find('i[data-type="flag"]').addClass('mdui-text-color-red');
  });
  greenList.forEach((element) => {
    $('#clue-' + element).find('i[data-type="flag"]').removeClass('mdui-hidden');
    $('#clue-' + element).find('i[data-type="flag"]').addClass('mdui-text-color-green');
  });
  blueList.forEach((element) => {
    $('#clue-' + element).find('i[data-type="flag"]').removeClass('mdui-hidden');
    $('#clue-' + element).find('i[data-type="flag"]').addClass('mdui-text-color-blue');
  });

  if (DEBUG) d($('#story-1').data('keywords').split(','));

}