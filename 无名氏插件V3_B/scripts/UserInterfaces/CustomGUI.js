import {
  ScriptUI
} from "../API/UIAPI.js";
import {
  UIManager
} from "./init.js";
import {
  USFPlayer
} from "../API/API.js";
import * as mc from "@minecraft/server";

/*
  变量：/v.<key>，如/v.a
  数据：/scoreboard.name（只能获取自己分数）
        /tag.name：String
  处理：/(boolean ? a : b)
        /
  
  
*/

class CustomGUI {
  constructor(uiType, title){
    this.ui = new (uiType === 0 ? ScriptUI.ActionFormData : uiType === 1 ? ScriptUI.ScriptModalFormData)();
    this.ui.setTitle(title);
  };
  setInformation(info){
    this.info = info;
  }
}

class CustomManagerGUI extends ScriptUI.ActionFormData {
  constructor(){
    super();
    this.setTitle("自定义界面");
    this.setButtonsArray([{
      buttonDef: {
        text: "添加自定义界面"
      },
      event: (player)=>{
        
      }
    }]);
  }
};

class AddCustomUI extends 