/**
 * Cookies操作
 */

export const Cookies = {
  // 写入cookie
  set: function(name, value, iDay) {
    var newDate = new Date();
    newDate.setDate(newDate.getDate() + iDay);
    value = encodeURIComponent(value);
    document.cookie = name + "=" + value + ";expires=" + newDate + ";path=/";
  },
  // 读取cookie
  get: function(name) {
    var cookie = decodeURIComponent(document.cookie);
    var arr = cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=");
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
  }
};