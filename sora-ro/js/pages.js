/**
 * 游戏页面模板
 */
import { DEBUG } from './debug.js'
import { Dialogs } from './dialogs.js'
/**

/* Object常量
 * 页面
 */
export const Pages = {
  // 游戏主菜单
  mainMenu: {
    // 版本号
    ver: 20220127,
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
      }
    ],
    /**
     * 组件HTML模板
     * 自执行函数，返回document.element对象
     */
    template: function() {
      if (DEBUG) console.log('===Components.mainMenu.template===');
      let template =
        '<page id="main-menu" class="blank">' +
        '<section id="main-menu-top">' +
        '<div class="middle">' +
        '<h1>𝕊𝕠𝕣𝕒-𝕣𝕠</h1>' +
        '</section>' +
        '<section id="main-menu-bottom">' +
        '<div class="middle">' +
        '<b id="start-game" role="button">开始游戏</b><br><br>' +
        '<b id="update-log" role="button" class="outline" data-target="updateLog">更新日志</b>' +
        '</div>' +
        '<p class="bottom-left"><small>Ver.' + this.ver + '<small></p>' +
        '</section>' +
        '</page>';
      if (DEBUG) console.log('return: ' + template);
      if (DEBUG) console.log('===Components.mainMenu.template===');
      return template;
    }
  }
}