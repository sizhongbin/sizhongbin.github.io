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
    let body = document.createElement("div");
    body.innerHTML = Components.title.template();
    if(DEBUG)console.log(body.childNodes);
    body = body.childNodes[0];
    componentHandler.upgradeElement(body);
    //document.getElementsByTagName('body')[0].appendChild(body);
    $("body").html(body);
    if (DEBUG) console.log('Game.start end');
  }
};

// 游戏主流程开始
window.onload = function() {
  Game.start();
};