/**
 * 游戏对话框
 * 前半为Pico.css的Module相关操作函数
 * */
import { DEBUG } from './debug.js'

/*
 * Modal
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2021 - Licensed under MIT
 */

// 基础设置
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400;
let $visibleModal = null;

// Modal开关
const toggleModal = element => {
  if (DEBUG) console.log('===toggleModal===');
  const $modal = $(element);
  (typeof($modal) != undefined && $modal != null) &&
  isModalOpen($modal) ? closeModal($modal) : openModal($modal);
  if (DEBUG) console.log('===toggleModal===');
}

// 判断Modal是否已开启
const isModalOpen = $modal => {
  return $modal.attr('open') != undefined && $modal.attr('open') != 'false' ? true : false;
}

// 开启Modal
const openModal = $modal => {
  if (isScrollbarVisible()) {
  //document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  $modal.find('#dialog-body').css('--scrollbar-width', `${getScrollbarWidth()}px`);
  }
  $modal.addClass(isOpenClass, openingClass);
  setTimeout(() => {
    $visibleModal = $modal;
    $modal.removeClass(openingClass);
  }, animationDuration);
  $modal.attr('open', true);
}

// 关闭Modal
const closeModal = $modal => {
  $visibleModal = null;
  $modal.addClass(closingClass);
  setTimeout(() => {
    $modal.removeClass(closingClass, isOpenClass);
    $modal.find('#dialog-body').css('--scrollbar-width','');
    $modal.removeAttr('open');
  }, animationDuration);
}

// 点击Modal外区域关闭
document.addEventListener('click', event => {
  if ($visibleModal != null) {
    const $modalContent = $visibleModal.find('article');
    const isClickInside = $.contains($modalContent, event.target);
    !isClickInside && closeModal($visibleModal);
  }
});

// 获取滚动条宽
const getScrollbarWidth = () => {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// 判断对话框内容滚动条是否展示
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
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
      if (DEBUG) console.log('===Dialogs.updateLog.template===');
      let template =
        '<dialog id="dialog-update-log">' +
        '<article class="large-dialog flex-column-layout">' +
        '<header>更新日志<ins id="dialog-update-log-close" class="dialog-close">X</ins></header>' +
        '<div id="dialog-body" class="flex-size">' +
        '<p>开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中开发中</p>' +
        '</div>' +
        '</article>' +
        '</dialog>';
      if (DEBUG) console.log('return: ' + template);
      if (DEBUG) console.log('===Dialogs.updateLog.template===');
      return template;
    },
    /**
     * 开关事件
     */
    toggle: function() {
      if (DEBUG) console.log('===Dialogs.updateLog.toggle===');
      toggleModal("#dialog-update-log");
      if (DEBUG) console.log('===Dialogs.updateLog.toggle===');
    }
  }
}