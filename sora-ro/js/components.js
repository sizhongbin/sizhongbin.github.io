/**
 * 游戏组件
 */

/**
 * Boolean常量
 * DEBUG模式开关，合并到master时改成0
 */
const DEBUG = 1;

/**
 * HTML模板创建函数
 * 参数Array，格式为[[‘tag’,[‘attribute’,‘value’]],[‘textNode’,‘text’],'/']
 * [tag,[attribute,value]]代表新建一个标签，可支持多个属性，如['div',['id','value'],['class','value']]
 * [textNode,text]代表给前一个标签增加文本节点，如[‘textNode’,‘文本’]
 * '/'代表关闭前一个标签
 * 返回document.element对象
 */
function createTemplate(arr) {
  if (DEBUG) console.log('createTemplate(arr) start');
  if (DEBUG) console.log('param: ' + arr);
  const Nodes = [];
  for (let i = 0; i < arr.length; i++) {
    if (DEBUG) console.log('arr[' + i + ']: ' + arr[i]);
    if (arr[i] == '/') {
      if (DEBUG) console.log('case /');
      if (Nodes.length == 1) break;
      Nodes[Nodes.length - 2].appendChild(Nodes[Nodes.length - 1]);
      Nodes.pop();
      if (DEBUG) console.log('Nodes[' + (Nodes.length - 1) + ']: ' + Nodes[Nodes.length - 1].tagName);
    }
    else if (arr[i][0] == 'textNode') {
      if (DEBUG) console.log('case textNode');
      Nodes[Nodes.length - 1].appendChild(document.createTextNode(arr[i][1]));
    }
    else {
      if (DEBUG) console.log('case else');
      Nodes[Nodes.length] = document.createElement(arr[i][0]);
      for (let j = 1; j < arr[i].length; j++) {
        Nodes[Nodes.length - 1].setAttribute(arr[i][j][0], arr[i][j][1]);
      }
      if (DEBUG) console.dir(Nodes[Nodes.length - 1]);
    }
    if (DEBUG) console.log('Nodes: '+Nodes);
  }
  if (DEBUG) console.log(Nodes[0]);
  if (DEBUG) console.log('createTemplate(arr) end');
  return Nodes[0];
}

/* Object常量
 * 组件
 */
export const Components = {
  // 常驻标题框
  title: {
    /**
     * 组件HTML模板
     * 自执行函数，返回document.element对象
     */
    template: (() => {
      if (DEBUG) console.log('Components.title.template start');
      let template = createTemplate([
        ['div', ['class', 'mdl-layout mdl-js-layout mdl-layout--fixed-header']],
        // 标题栏 
        ['header', ['class', 'mdl-layout__header']],
        ['div', ['class', 'mdl-layout__header-row']],
        // 标题 
        ['span', ['class', 'mdl-layout-title']],
        ['textNode', '天禁仙境'],
        '/',
        '/',
        '/',
        // 下拉菜单 
        ['div', ['class', 'mdl-layout__drawer']],
        ['span', ['class', 'mdl-layout-title']],
        ['textNode', '天禁仙境'],
        '/',
        ['nav', ['class', 'mdl-navigation']],
        ['a', ['class', 'mdl-navigation__link'], ['title', 'refresh'], ['href', 'index.html']],
        ['textNode', '刷新'],
        '/',
        '/',
        '/',
        ['main', ['class', 'mdl-layout__content']],
        ['div', ['id', 'game-content']],
        // 游戏内容，由JS控制 
        '/',
        '/',
        '/']);
      if (DEBUG) console.log(template);
      if (DEBUG) console.log('Components.title.template end');
      return template;
    })()
  }
}