/**
 * 游戏主流程控制
 */
import { Components } from './components.js'
/**
 * Boolean常量
 * DEBUG模式开关，合并到master时改成0
 */
const DEBUG = 1;

/* Object常量
 * 主流程控制函数
 */
const Game = {
  start: function() {
    if (DEBUG) console.log('Game.start start');
    $('body').append(Components.title.template);
    let elements = document.body.children;
    if (DEBUG) console.log(elements);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].className.includes('mdl-'))
        componentHandler.upgradeElement(elements[i]);
    }
    if (DEBUG) console.log('Game.start end');
  }
};

// 游戏主流程开始
$(window).on('load',function() {
  Game.start();
});