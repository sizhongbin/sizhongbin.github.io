/**
 * 游戏页面模板
 */
import { DEBUG } from './debug.js'
import { Dialogs } from './dialogs.js'
import { Methods } from './methods.js'
import { goto } from './main.js'
import { Data } from './data.js'
import { Story } from './story.js'
/**

/* Object常量
 * 页面
 */
export const Pages = {
  // 游戏主菜单
  mainMenu: {
    // 开始游戏按钮文字
    startGameText: '开始游戏',
    // 组件
    components: [
      Dialogs.updateLog
    ],
    // 事件
    events: [
      {
        elem: '#update-log',
        event: 'click',
        func: Dialogs.updateLog.toggle
      },
      {
        elem: '#start-game',
        event: 'click',
        func: () => { goto('start-game') }
      }
    ],
    /**
     * 组件HTML模板
     * 返回字符串
     */
    template: function() {
      if (DEBUG) console.log('=====Pages.mainMenu.template');
      let template =
        '<page id="main-menu" class="flex-column-layout">' +
        '<section class="flex-column-layout flex-center">' +
        '<h1>𝕊𝕠𝕣𝕒-𝕣𝕠</h1>' +
        '</section>' +
        '<section class="flex-column-layout flex-center">' +
        '<p id="start-game" role="button">' + this.startGameText + '</p>' +
        '<p id="update-log" role="button" class="outline">更新日志</p>' +
        '</section>' +
        '<p class="bottom-left"><small>Ver.' + Data.ver + '<small></p>' +
        '</section>' +
        '</page>';
      if (DEBUG) console.log('return: ' + template);
      if (DEBUG) console.log('Pages.mainMenu.template=====');
      return template;
    }
  },
  story: {
    // 章节
    chapter: null,
    /**
     * 组件HTML模板
     * 返回字符串
     */
    // 组件
    components: [],
    // 事件
    events: [
      {
        elem: '#dialog-story-stage-info',
        event: 'click',
        func: () => { goto('stage-info') }
        }
    ],
    template: function() {
      if (DEBUG) console.log('=====Pages.story.template');
      if (DEBUG) console.log('chapter: ' + this.chapter);
      let template =
        '<page id="story" class="flex-column-layout">' +
        '<article class="full-screen flex-column-layout">' +
        '<header>' + Story[this.chapter].title + '</header>' +
        '<div id="story-body" class="flex-size">' + Story[this.chapter].body + '</div>' +
        '<footer>' +
        '<p id="dialog-story-stage-info" role="button">进入关卡</p>' +
        '</footer>' +
        '</article>' +
        '</page>';
      if (DEBUG) console.log('return: ' + template);
      if (DEBUG) console.log('Pages.story.template=====');
      return template;
    }
  }
}