import {
  ScriptUI
} from "../API/UIAPI.js";
import {
  UIManager
} from "./init.js";
import {
  OpLevel
} from "../API/API.js";
import * as mc from "@minecraft/server";

/*
  等级：
  普通玩家：0
  低级管理：1
  中级管理：2
  高级管理：3
  服主：4
*/

const ManagerDefaultConfig = [{
    level: 0,
    power: []
  },
  {
    level: 1,
    power: [
      "scoreBoardManager",
      ""
    ]
  },
  {
    level: 2,
    power: []
  },
  {
    level: 3,
    power: []
  },
  {
    level: 4,
    power: [
      "Custom"
    ]
  },
  {
    level: 5,
    power: ["All"]
  }
]


class ManagerInterface extends ScriptUI.ActionFormData {
  static typeId = "ManagerGUI";
  constructor(player) {
    super();
    let level = OpLevel.getLevel(player);
    this.setTitle("管理界面");
    this.setButtonsArray([{
        buttonDef: {
          text: "设置计分板"
        },
        condition: (player) => {
          return ManagerDefaultConfig[level].power.includes("scoreBoardManager") || level === 5;
        },
        event: (player) => {
          new ScoreBoardGUI().sendToPlayer(player);
        }
      },
      {
        buttonDef: {
          text: "插件重要设置"
        },
        event: (player) => {}
      }
    ]);
    this.setBeforeSendEvents((player) => {
      this.setInformation(`管理等级：${level}`);
      if (level === 0) {
        this.cancel = true;
      }
    });
  }
};
mc.system.run(() => {
  UIManager.addUI(ManagerInterface);
});



//计分板管理
//总界面
class ScoreBoardGUI extends ScriptUI.ActionFormData {
  constructor() {
    super();
    let scoreBoardList = mc.world.scoreboard.getObjectives();
    this.setTitle("计分板管理");
    this.setInformation(`计分板个数：${scoreBoardList.length}`);
    this.setButtonsArray([{
      buttonDef: {
        text: "添加计分板"
      },
      event: (player) => {
        new AddScoreBoard().sendToPlayer(player);
      }
    }]);
    for (let sb of scoreBoardList) {
      this.addButton({
        buttonDef: {
          text: `id: ${sb.id}\n名称: ${sb.displayName}`
        },
        event: (player) => {
          new SetScoreBoard(sb).sendToPlayer(player);
        }
      })
    }
  }
};
//添加计分板
class AddScoreBoard extends ScriptUI.ModalFormData {
  constructor() {
    super();
    this.setTitle(`添加计分板`);
    this.setButtonsArray([
      {
        typeId: "textField",
        id: "sb_id",
        label: "计分板id（必填，仅支持英语字母）",
        setting: {
          placeHolderText: "计分板id"
        }
      },
      {
        typeId: "textField",
        id: "sb_name",
        label: "计分板名称（选填）（支持各种字符）",
        setting: {
          placeHolderText: "计分板名称"
        }
      },
      {
        typeId: "toggle",
        id: "sb_display_sidebar",
        label: "显示在侧边栏",
        setting: {
          defaultValue: false
        }
      },
      {
        typeId: "toggle",
        id: "sb_display_list",
        label: "显示在玩家列表（暂停界面）",
        setting: {
          defaultValue: false
        }
      },
      {
      typeId: "toggle",
      id: "sb_display_sortOrder",
      label: "升序/降序排列",
      setting: {
        defaultValue: false
      }
    }]);
    this.setEvents((player, results) => {
      let sb = mc.world.scoreboard.addObjective(results.get("sb_id"), (results.get("sb_name").length === 0 ? undefined : results.get("sb_name")));
      if(results.get("sb_display_sidebar"))mc.world.scoreboard.setObjectiveAtDisplaySlot("Sidebar", {objective: sb, sortOrder: (results.get("sb_display_sortOrder") === true ? 1 : 0)});
      if(results.get("sb_display_list"))mc.world.scoreboard.setObjectiveAtDisplaySlot("List", {objective: sb, sortOrder: (results.get("sb_display_sortOrder") === true ? 1 : 0)});
    });
  }
};

class SetScoreBoard extends ScriptUI.ActionFormData {
  constructor(scoreBoard){
    super();
    this.setTitle("设置计分板：" + (scoreBoard.displayName === undefined ? scoreBoard.id : scoreBoard.displayName));
    this.setButtonsArray([
      {
        buttonDef: {
          text: "删除"
        },
        event: (player)=>{
          mc.world.scoreboard.removeObjective(scoreBoard);
        }
      }
    ]);
  }
}