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

// 记录当前关卡
let currentStage = null;

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
    }
  },
  // 故事
  story: {
    // 载入页面
    load: function(chapter) {
      if (DEBUG) console.log('=====Game.story.load');
      Pages.story.chapter = chapter;
      pageLoad(Pages.story);
      if (DEBUG) console.log('Game.story.load=====');
    }
  }
};

// dom载入页面
function pageLoad(page) {
  if (DEBUG) console.log('=====pageLoad');
  $('main').hide();
  $('main').html(page.template());
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
}

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
        // 进主界面
        alert('continueStory');
      } else {
        // 卸载当前页面
        pageUnload(currentPage);
        // 开始序章
        currentStage = '0';
        Game.story.load('0');
      }
      if (DEBUG) console.log('goto=====');
      break;
    }
    case 'stage-info': {
      if (DEBUG) console.log('enter case stage-info');
      // 卸载当前页面
      pageUnload(currentPage);
      // 进入关卡信息页面
      alert('stage-info');
      break;
    }
  }

  // 游戏主流程开始
  $(window).on('load', function() {
    // 加载游戏主菜单
    Game.mainMenu.load();
  });