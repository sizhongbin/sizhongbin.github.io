/**
 * 功能函数
 */
import { Cookies } from './Cookies.js'
import { DEBUG } from './debug.js'
import { Data } from './data.js'
import { goto } from './main.js'

export const Methods = {
  // 判断是否已有存档
  isNewGame: function() {
    if (DEBUG) console.log('=====Methods.isNewGame');
    if (DEBUG) console.log('Cookies s: ' + Cookies.get('s'));
    if (DEBUG) console.log('Methods.isNewGame=====');
    if (Cookies.get('s') == undefined)
      return true;
    else return false;
  },
  // 存档初始化
  initSave: function() {
    const save = [
    /* 0:关卡进度，存已通关关卡键。下标0为总进度，1-为各职业进度，对应职业键 */
    [0,
      0],
    /* 1:怪物情报，存已有情报怪物键*/
    [1,
      2],
    /* 2:职业等级，存等级。下标0为基本等级，1-为各职业等级，对应职业键 */
    [3,
      3],
    /* 3:当前职业键 */
    1,
    /* 4:初始属性键 */
    0,
    /* 5:初始种族键 */
    0,
    /* 6:初始体型键 */
    1,
    /* 7:钱 */
    0,
    /* 8:六维，下标对应savidl */
    [2,
      1,
      2,
      1,
      1,
      1],
    /* 9:装备，[部位[装备,[卡片]]]，最后为投射物，存键 */
    [[2000,
      []],
      [2000,
        []],
      [2000,
        []],
      [2002,
        []],
      [2000,
        []],
      [1001,
        []],
      [2000,
        []],
      [2000,
        []],
      [2000,
        []],
      [2000,
        []],
      [4000,
        []]],
    /* 10:习得技能，[技能,等级]，存键 */
    [[1,
      1],
      [2,
        1]],
    /* 11:携带物品，[道具,数量]，存键 */
    [[1,
      1]],
    /* 12:支援，存键 */
    [],
    /* 13:仓库物品，[道具,数量]，存键 */
    [],
    /* 14:公会名，0无，1天禁仙境 */
    0
  ];
    Cookies.set("s", JSON.stringify(save),
      365);
    return;
  },
  // 读取cookies并为角色数据赋值
  load: function() {
    const save = JSON.parse(Cookies.get("s"));
    Data.you = {
      currentStage: save[0],
      sensedEnemy: save[1],
      jobLv: save[2],
      currentJob: save[3],
      attribute: save[4],
      race: save[5],
      size: save[6],
      zeny: save[7],
      stats: {
        str: save[8][0],
        agi: save[8][1],
        vit: save[8][2],
        int: save[8][3],
        dex: save[8][4],
        luk: save[8][5]
      },
      equip: {
        "头上": {
          id: save[9][0][0],
          card: save[9][0][1]
        },
        "头中": {
          id: save[9][1][0],
          card: save[9][1][1]
        },
        "头下": {
          id: save[9][2][0],
          card: save[9][2][1]
        },
        "身体": {
          id: save[9][3][0],
          card: save[9][3][1]
        },
        "副手": {
          id: save[9][4][0],
          card: save[9][4][1]
        },
        "主手": {
          id: save[9][5][0],
          card: save[9][5][1]
        },
        "披挂": {
          id: save[9][6][0],
          card: save[9][6][1]
        },
        "鞋子": {
          id: save[9][7][0],
          card: save[9][7][1]
        },
        "饰品一": {
          id: save[9][8][0],
          card: save[9][8][1]
        },
        "饰品二": {
          id: save[9][9][0],
          card: save[9][9][1]
        },
        "投射物": {
          id: save[9][10][0],
          card: save[9][10][1]
        }
      },
      learnedSkill: (() => {
        var obj = {};
        for (let i = 0; i < save[10].length; i++)
          obj[save[10][i][0]] = save[10][i][1];
        return obj;
      })(),
      carriedItem: (function() {
        var obj = {};
        for (let i = 0; i < save[11].length; i++)
          obj[save[11][i][0]] = save[11][i][1];
        return obj;
      })(),
      assist: [],
      storeItem: (function() {
        var obj = {};
        for (let i = 0; i < save[13].length; i++)
          obj[save[13][i][0]] = save[13][i][1];
        return obj;
      })(),
      guild: (save[14] == 1 ? "天禁仙境" : "无")
    };
    return;
  },
  // 把角色数据存进cookies
  save: function() {
    const save = [];
    save[0] = you.currentStage;
    save[1] = you.sensedEnemy;
    save[2] = you.jobLv;
    save[3] = you.currentJob;
    save[4] = you.attribute;
    save[5] = you.race;
    save[6] = you.size;
    save[7] = you.zeny;
    save[8] = [];
    save[8][0] = you.stats.str;
    save[8][1] = you.stats.agi;
    save[8][2] = you.stats.vit;
    save[8][3] = you.stats.int;
    save[8][4] = you.stats.dex;
    save[8][5] = you.stats.luk;
    save[9] = [];
    save[9][0] = [];
    save[9][0][0] = you.equip["头上"].id;
    save[9][0][1] = you.equip["头上"].card;
    save[9][1] = [];
    save[9][1][0] = you.equip["头中"].id;
    save[9][1][1] = you.equip["头中"].card;
    save[9][2] = [];
    save[9][2][0] = you.equip["头下"].id;
    save[9][2][1] = you.equip["头下"].card;
    save[9][3] = [];
    save[9][3][0] = you.equip["身体"].id;
    save[9][3][1] = you.equip["身体"].card;
    save[9][4] = [];
    save[9][4][0] = you.equip["副手"].id;
    save[9][4][1] = you.equip["副手"].card;
    save[9][5] = [];
    save[9][5][0] = you.equip["主手"].id;
    save[9][5][1] = you.equip["主手"].card;
    save[9][6] = [];
    save[9][6][0] = you.equip["披挂"].id;
    save[9][6][1] = you.equip["披挂"].card;
    save[9][7] = [];
    save[9][7][0] = you.equip["鞋子"].id;
    save[9][7][1] = you.equip["鞋子"].card;
    save[9][8] = [];
    save[9][8][0] = you.equip["饰品一"].id;
    save[9][8][1] = you.equip["饰品一"].card;
    save[9][9] = [];
    save[9][9][0] = you.equip["饰品二"].id;
    save[9][9][1] = you.equip["饰品二"].card;
    save[9][10] = [];
    save[9][10][0] = you.equip["投射物"].id;
    save[9][10][1] = you.equip["投射物"].card;
    save[10] = [];
    for (let i = 0, k = Object.keys(you.learnedSkill); i < k.length; i++) {
      save[10][i] = [];
      save[10][i][0] = Number(k[i]);
      save[10][i][1] = you.learnedSkill[k[i]];
    }
    save[11] = [];
    for (let i = 0, k = Object.keys(you.carriedItem); i < k.length; i++) {
      save[11][i] = [];
      save[11][i][0] = Number(k[i]);
      save[11][i][1] = you.carriedItem[k[i]];
    }
    save[12] = you.assist;
    save[13] = [];
    for (let i = 0, k = Object.keys(you.storeItem); i < k.length; i++) {
      save[13][i] = [];
      save[13][i][0] = Number(k[i]);
      save[13][i][1] = you.storeItem[k[i]];
    }
    save[14] = (you.guild == "无" ? 0 : 1);
    this.set("s", JSON.stringify(save), 365);
    return;
  }

}