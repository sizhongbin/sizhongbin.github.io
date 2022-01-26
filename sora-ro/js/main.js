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
    $('#game').html('');
    $('#game').append(Components.title.template);
    let elements = document.getElementById('game').children;
    if (DEBUG) console.log(elements);

    function handle(element) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].children.length > 0) hendle(elements[i]);
        else componentHandler.upgradeElement(elements[i]);
      }
    }(elements[0]);
    if (DEBUG) console.log('Game.start end');
  }
};

// 游戏主流程开始
document.fonts.onloadingdone = function() {
  Game.start();
};