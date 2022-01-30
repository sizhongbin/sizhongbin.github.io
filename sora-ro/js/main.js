/**
 * 游戏主流程控制
 */
import { DEBUG } from './debug.js'
import { Pages } from './pages.js'
import { Methods } from './methods.js'
import { Data } from './data.js'
// import { Dialogs } from './dialogs.js'
// 记录当前页面
let currentPage = null;

/* Object常量
 * 主流程控制
 */
const Game = {
  // 游戏主菜单
  mainMenu: {
    // 载入页面
    load: function() {
      if (DEBUG) console.log('=====Game.mainMenu.load');
      if (!Methods.isNewGame()) {
        Pages.mainMenu.startGameText = '继续游戏';
      }
      pageLoad(Pages.mainMenu);
      if (DEBUG) console.log('Game.mainMenu.load=====');
    },
    // 卸载页面
    unload: function() {
      if (DEBUG) console.log('=====Game.mainMenu.unload');
      pageUnload(Pages.mainMenu);
      if (DEBUG) console.log('Game.mainMenu.unload=====');
    }
  },
  // 故事
  story: {
    // 载入页面
    load: function(chapter) {
      alert('story start');
    },
    // 卸载页面
    unload: function() {

    }
  }
};

// dom载入页面
function pageLoad(page) {
  if (DEBUG) console.log('=====pageLoad');
  $('main').hide();
  $('main').html(page.template());
  //$('main').append(page.template());
  $('main').attr('page', 'main-menu');
  currentPage = page;
  for (let component of page.components) {
    $('#main-menu').append(component.template());
    for (let event of component.events) {
      $(event.elem).on(event.event, event.func);
      if (DEBUG) console.log('events: ');
      if (DEBUG) console.dir($._data($(event.elem)[0], 'events'));
    }
  }
  for (let event of page.events) {
    $(event.elem).on(event.event, event.func);
    if (DEBUG) console.log('events: ');
    if (DEBUG) console.dir($._data($(event.elem)[0], 'events'));
  }
  setTimeout(function() { $('main').fadeIn(400) }, 100);
  if (DEBUG) console.log('main: ');
  if (DEBUG) console.dir($('main').get(0));
  if (DEBUG) console.log('pageLoad=====');
};

// dom卸载页面
function pageUnload(page) {
  if (DEBUG) console.log('=====pageUnload');
  for (let event of page.events) {
    $(event.elem).off(event.event, event.func);
    if (DEBUG) console.log('events: ');
    if (DEBUG) console.dir($._data($(event.elem)[0], 'events'));
  }
  for (let component of page.components) {
    for (let event of component.events) {
      $(event.elem).off(event.event, event.func);
      if (DEBUG) console.log('events: ');
      if (DEBUG) console.dir($._data($(event.elem)[0], 'events'));
    }
  }
  $('main').html('');
  $('main').attr('page', '');
  currentPage = null;
  if (DEBUG) console.log('main: ');
  if (DEBUG) console.dir($('main').get(0));
  if (DEBUG) console.log('pageUnload=====');
}

// 接收流程推进
export function goto(flow) {
  if (DEBUG) console.log('=====goto');
  switch (flow) {
    // 开始/继续游戏
    case 'start-game': {
      if (DEBUG) console.log('enter case start-game');
      if (Methods.isNewGame())
        Methods.initSave();
      // 读角色数据
      Methods.load();
      // 取关卡进度
      if (Data.you.currentStage[0] !== 0) {
        // 进选关界面
        alert('continueStory');
      } else {
        // 卸载当前页面
        pageUnload(currentPage);
        // 开序章
        Game.story.load(0);
      }
      if (DEBUG) console.log('goto=====');
      break;
    }
  }
}

// 游戏主流程开始
$(window).on('load', function() {
  // 加载游戏主菜单
  Game.mainMenu.load();
});