  // 提示框
  function showNotification(type) {
    var message;
    switch (type) {
      case 'key-hit':
        message = '命中关键！故事进入下一节。';
        break;
      case 'key-miss':
        message = '未命中关键。';
        break;
      case 'hint-miss':
        message = '未找到任何线索。';
        break;
      case 'hint-repeat':
        message = '已经找到过线索了。';
        break;
      case 'hint-hit':
        message = '找到新的线索！更多故事内容已显现。';
        break;
      case 'no-key':
        message = '目前还看不到关键，需要更多线索。';
        break;
      case 'no-hint':
        message = '目前不需要更多线索。';
        break;
      case 'bad-end':
        message = '已进入BE。请读档。';
        break;
    }
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar(
    {
      message: message
    });
  }

  // 关键匹配
  function matchKey(inputKey) {
    var currentDiv = document.querySelector('main div[data-id="' + localStorage.p + '"]');
    var keyAnswerList = currentDiv.querySelectorAll('main span[data-type="key-answer"]');
    for (i = 0; i < keyAnswerList.length; i++) {
      if (keyAnswerList[i].innerHTML == inputKey) {
        var parentList = keyAnswerList[i].dataset.parent.split(',');
        var parentHit = true;
        if (parentList[0] != 0) {
          for (j = 0; j < parentList.length; j++) {
            if (currentDiv.querySelector('span[data-id="' + parentList[j] + '"]').dataset.hit == 0) {
              parentHit = false;
              break;
            }
          };
        }
        if (!parentHit)
          return 0;
        else return keyAnswerList[i].dataset.id;
      }
    };
    return 0;
  }

  // 线索匹配
  function matchHint(inputHint) {
    var currentDiv = document.querySelector('main div[data-id="' + localStorage.p + '"]');
    var hintList = currentDiv.querySelectorAll('main span[data-type="hint"]');
    for (i = 0; i < hintList.length; i++) {
      if (hintList[i].innerHTML == inputHint) {
        if (hintList[i].dataset.hit == 1)
          return -1;
        else {
          var parentList = hintList[i].dataset.parent.split(',');
          var parentHit = true;
          if (parentList[0] != 0) {
            for (j = 0; j < parentList.length; j++) {
              if (currentDiv.querySelector('span[data-id="' + parentList[j] + '"]').dataset.hit == 0) {
                parentHit = false;
                break;
              }
            };
          }
          if (!parentHit)
            return 0;
          else return hintList[i].dataset.id;
        }
      }
    };
    return 0;
  }