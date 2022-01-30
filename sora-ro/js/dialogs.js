/**
 * 游戏对话框
 * 前半为Pico.css的Module相关操作函数
 * */
import { DEBUG } from './debug.js'

// 动画时间
const animationDuration = 400;

// 当前展开的Modal
let $visibleModal = null;

// Modal开关
const toggleModal = element => {
  if (DEBUG) console.log('=====toggleModal');
  const $modal = $(element);
  (typeof($modal) != undefined && $modal != null) &&
  isModalOpen($modal) ? closeModal($modal) : openModal($modal);
  if (DEBUG) console.log('toggleModal=====');
}

// 判断Modal是否已开启
const isModalOpen = $modal => {
  return $modal.attr('open') != undefined && $modal.attr('open') != 'false' ? true : false;
}

// 开启Modal
const openModal = $modal => {
  $('html').addClass('modal-is-open modal-is-opening');
  setTimeout(() => {
    $visibleModal = $modal;
    $('html').removeClass('modal-is-opening');
  }, animationDuration);
  $modal.attr('open', true);
}

// 关闭Modal
const closeModal = $modal => {
  $visibleModal = null;
  $('html').addClass('modal-is-closing');
  setTimeout(() => {
    $('html').removeClass('modal-is-closing modal-is-open');
    $('html').css('--scrollbar-width', '');
    $modal.removeAttr('open');
  }, animationDuration);
}

/* Object常量
 * 对话框
 */
export const Dialogs = {
  // 更新日志
  updateLog: {
    //事件
    events: [
      {
        elem: '#dialog-update-log-close',
        event: 'click',
        func: () => { Dialogs.updateLog.toggle(); }
      }
    ],
    /**
     * HTML模板
     * 返回String
     */
    template: function() {
      if (DEBUG) console.log('=====Dialogs.updateLog.template');
      let template =
        '<dialog id="dialog-update-log">' +
        '<article class="large-dialog flex-column-layout">' +
        '<header>更新日志</header>' +
        '<div id="dialog-body" class="flex-size">' +
        '<p>开发中</p>' +
        '</div>' +
        '<footer>' +
        '<p id="dialog-update-log-close" role="button" class="outline">关闭</p>' +
        '</footer>' +
        '</article>' +
        '</dialog>';
      if (DEBUG) console.log('return: ' + template);
      if (DEBUG) console.log('Dialogs.updateLog.template=====');
      return template;
    },
    /**
     * 开关事件
     */
    toggle: function() {
      if (DEBUG) console.log('=====Dialogs.updateLog.toggle');
      toggleModal("#dialog-update-log");
      if (DEBUG) console.log('Dialogs.updateLog.toggle=====');
    }
  }
}