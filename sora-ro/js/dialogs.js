/**
 * 游戏对话框
 * */
import { DEBUG } from './debug.js'

export const Dialogs = {
  // 更新日志
  updateLog: {
    template: function() {
      if (DEBUG) console.log('===Dialogs.updateLog.template===');
      let template =
        '<dialog id="update-log">' +
        '<article>' +
        '<a href="#close" aria-label="Close" class="close" data-target="update-log"></a>' +
        '<h3>更新日志</h3>' +
        '<p>开发中</p>' +
        '</article>' +
        '</dialog>';
      if (DEBUG) console.log('return: ' + template);
      if (DEBUG) console.log('===Dialogs.updateLog.template===');
      return template;
    },
    toggle: function(){
      alert('toggle');
    }
  }
}