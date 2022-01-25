/**
 * 游戏主流程控制
 */

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
    if (DEBUG) console.log('Game.start');
  }
};

// 游戏主流程开始
Game.start();