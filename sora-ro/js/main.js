/**
 * 游戏主流程控制
 */
import { DEBUG } from './debug.js'
import { Pages } from './pages.js'
// import { Dialogs } from './dialogs.js'

/* Object常量
 * 主流程控制
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
      for (let component of Pages.mainMenu.components) {
        $('#main-menu').append(component.template());
        for (let event of component.events) {
          $(event.elem).on(event.event, event.func);
          if (DEBUG) console.log('events: ');
          if (DEBUG) console.dir($._data($(event.elem)[0], 'events'));
        }
      }
      for (let event of Pages.mainMenu.events) {
        $(event.elem).on(event.event, event.func);
        if (DEBUG) console.log('events: ');
        if (DEBUG) console.dir($._data($(event.elem)[0],'events'));
      }
      if (DEBUG) console.log('main: ');
      if (DEBUG) console.dir($('main').get(0));
      if (DEBUG) console.log('===Game.mainMenu.load===');
    },
    updateLog: function() {
      if (DEBUG) console.log('===Game.updateLog===');
      alert('test');
      if (DEBUG) console.log('===Game.updateLog===');
    }
  }
};

// 游戏主流程开始
$(window).on('load', function() {
  Game.start();
});