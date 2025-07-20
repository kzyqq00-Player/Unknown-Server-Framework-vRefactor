import {
  ScriptUI
} from "../API/UIAPI.js";
import {
  UIManager
} from "./init.js";
import {
  OpLevel
} from "../API/API.js";
import * as mc from "@minecraft/server"

class MainInterface extends ScriptUI.ActionFormData {
  constructor() {
    super();
    this.setTitle("主菜单");
    this.setInformation();
    this.setButtonsArray([{
        buttonDef: {
          text: "传送",
          iconPath: undefined
        },
        condition: (player) => {
          return true;
        },
        event: (player) => {
          new (UIManager.getUI("teleportGUI"))().sendToPlayer(player);
        }
      },
      {
        buttonDef: {
          text: "聊天设置"
        },
        event: (player) => {

        }
      },
      {
        buttonDef: {
          text: "领地"
        },
        condition: (player) => {
          return true;
        },
        event: (player) => {}
      },
      {
        buttonDef: {
          text: "自杀",
          iconPath: undefined
        },
        /*condition: (player) => {
          return true;
        },*/
        event: (player) => {
          player.kill();
        }
      },
      {
        buttonDef: {
          text: "管理界面",
          iconPath: undefined
        },
        condition: (player) => {
          if(OpLevel.getLevel(player) > 0){
            return true;
          };
          return false;
        },
        event: (player) => {
          new (UIManager.getUI("ManagerGUI"))(player).sendToPlayer(player);
        }
      }
    ]);
  };
  static typeId = "mainGUI";
};

mc.system.run(() => {
  UIManager.addUI(MainInterface);
});