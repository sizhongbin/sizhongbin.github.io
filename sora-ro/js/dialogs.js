/**
 * 游戏对话框
 * 前半为Pico.css的Module相关函数
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
let visibleModal = null;

// Modal开关
const toggleModal = element => {
  if (DEBUG) console.log('===toggleModal===');
  const modal = document.getElementById(element);
  if (DEBUG) console.dir(modal);
  (typeof(modal) != 'undefined' && modal != null) &&
  isModalOpen(modal) ? closeModal(modal) : openModal(modal);
  if (DEBUG) console.log('===toggleModal===');
}

// Is modal open
const isModalOpen = modal => {
  return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
}

// Open modal
const openModal = modal => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute('open', true);
}

// Close modal
const closeModal = modal => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty('--scrollbar-width');
    modal.removeAttribute('open');
  }, animationDuration);
}

// Close with a click outside
document.addEventListener('click', event => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector('article');
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
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

// Is scrollbar visible
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
        '<article class="large-dialog">' +
        '<header>更新日志<ins id="dialog-update-log-close" class="dialog-close">X</ins></header>' +
        '<div>' +
        '<p>开发中</p>' +
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
      toggleModal("dialog-update-log");
      if (DEBUG) console.log('===Dialogs.updateLog.toggle===');
    }
  }
}