/**
 * 游戏组件
 */

/**
 * Boolean常量
 * DEBUG模式开关，合并到master时改成0
 */
const DEBUG = 1;

/* Object常量
 * 组件
 */
export const Components = {
  // 游戏主菜单
  mainMenu: {
    //版本号
    ver: 20220127,
    /**
     * 组件HTML模板
     * 自执行函数，返回document.element对象
     */
    getTemplate: function() {
      if (DEBUG) console.log('Components.mainMenu.template start');
      let template = 
        '<section id="main-menu-top">' +
        '<div class="middle">'+ 
        '<h1>𝕊𝕠𝕣𝕒-𝕣𝕠</h1>' +
        '</section>' +
        '<section id="main-menu-bottom">' +
        '<div class="middle">' +
        '<b role="button">开始游戏</b><br><br>' +
        '<b role="button" class="outline">更新日志</b>' +
        '</div>' + 
        '<a class="bottom-left">Ver.' + this.ver + '</a>' + 
        '</section>'
      ;
      if (DEBUG) console.dir(this);
      if (DEBUG) console.log('template: ');
      if (DEBUG) console.dir(template);
      if (DEBUG) console.log('Components.mainMenu.template end');
      return template;
    }
  }
}