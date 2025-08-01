import "./mainGUI.js";
import "./teleportGUI.js";
import "./managerGUI.js";
import "./landGUI.js";
//import "./CustomGUI.js";
let UI = {};

class UIManager {
  static addUI = (uiClass)=>{
    UI[uiClass.typeId] = uiClass;
  };
  static getUI = (typeId)=>{
    return UI[typeId];
  };
};

export { UIManager };