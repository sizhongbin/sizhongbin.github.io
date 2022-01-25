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
  // 常驻标题框
  title: {
    /**
     * 组件HTML模板
     * 返回String
     */
    template: () => {
      let template = 
      // 标题栏 
      '<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">' +
      '<header class="mdl-layout__header">' +
      '<div class="mdl-layout__header-row">' +
      // 标题 
      '<span class="mdl-layout-title">天禁仙境</span>' +
      '</div>' +
      '</header>' +
      // 下拉菜单 
      '<div class="mdl-layout__drawer">' +
      '<span class="mdl-layout-title">天禁仙境</span>' +
      '<nav class="mdl-navigation">' +
      '<a class="mdl-navigation__link" title="refresh" href="index.html">刷新</a>' +
      '</nav>' +
      '</div>' +
      '<main class="mdl-layout__content">' +
      '<div id="game-content">' +
      // 游戏内容，由JS控制 
      '</div>' +
      '</main>' +
      '</div>'; 
      if(DEBUG)console.log(template);
      return template;
    }
  }
}