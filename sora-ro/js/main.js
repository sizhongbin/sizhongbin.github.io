/**
 * 游戏主流程控制
 */
import { DEBUG } from './debug.js'
import { Pages } from './pages.js'
import { Dialogs } from './dialogs.js'

/* Object常量
 * 主流程控制函数
 */
const Game = {
  //游戏主流程开始
  start: function() {
    if (DEBUG) console.log('===Game.start===');
    // 加载游戏主菜单
    this.mainMenu.load();
    if (DEBUG) console.log('===Game.start===');
  },
  // 游戏主菜单
  mainMenu: {
    load: function() {
      if (DEBUG) console.log('===Game.mainMenu.load===');
      $('main').html('');
      $('main').append(Pages.mainMenu.template());
      if (DEBUG) console.log('main: ');
      if (DEBUG) console.dir($('main'));
      if (DEBUG) console.log('===Game.mainMenu.load===');
    },
    updateLog: function() {
      if (DEBUG) console.log('===Game.updateLog===');

      if (DEBUG) console.log('===Game.updateLog===');
    }
  }
};

// 游戏主流程开始
$(window).on('load', function() {
  Game.start();
});