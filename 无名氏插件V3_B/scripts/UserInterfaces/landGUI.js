import {
  ScriptUI
} from "../API/UIAPI.js";
import {
  UIManager
} from "./init.js";
import {
  USFPlayer,
  Land
} from "../API/API.js";
import * as mc from "@minecraft/server";



class LandGUI extends ScriptUI.ActionFormData {
  constructor() {
    super();
    this.setTitle("领地");
    this.setButtonsArray([{
      buttonDef: {
        text: "添加领地"
      },
      event: (player) => {
        player.land = {
          create: true,
          pos: []
        }
      }
    }]);
    this.setBeforeSendEvents((player) => {
      let player_land = Land.manager.getLandList({
        playerId: USFPlayer.getId(player)
      });
      for(let land of player_land){
        this.addButton({
          buttonDef: {
            text: `${land.name}`
          },
          event: (player)=>{
            new LandEditGUI(land).sendToPlayer(player);
          }
        });
      }
    });
  };
  static typeId = "LandGUI";
  static addLandGUI = () => {
    return AddLandGUI;
  };
};
mc.system.run(() => {
  UIManager.addUI(LandGUI);
});


class AddLandGUI extends ScriptUI.ModalFormData {
  constructor() {
    super();
    this.setTitle("添加领地");
    this.setButtonsArray([{
        typeId: "textField",
        id: "land_name",
        label: "领地名称",
        setting: {}
      },
      {
        typeId: "toggle",
        id: "land_create",
        label: "确认创建",
        setting: {}
      }
    ]);
    this.setBeforeSendEvents((player, ui) => {
      let data = {
        isCreate: true,
        owner: {
          id: USFPlayer.getId(player),
          name: player.name
        },
        dimension: player.dimension,
        pos: {
          from: player.land.pos[0],
          to: player.land.pos[1]
        }
      };
      let land = new Land(data);
      //mc.world.sendMessage("" + Land.coincide_allLand(land));
      if (Land.coincide_allLand(land)) {
        player.sendMessage("领地重叠，无法创建");
        ui.cancel = true;
        ui.cancel = true;
        ui.cancel = true;
        return;
      }
      this.setInformation(`当前花费：${(land.pos.max.x - land.pos.min.x) * (land.pos.max.y - land.pos.min.y) * (land.pos.max.z - land.pos.min.z) * 1 }`);
    });
    this.setEvents((player, results) => {
      if(results.get("land_name").length === 0){
        player.sendMessage("领地名不能为空");
        return;
      }
      if (results.get("land_create")) {
        let data = {
          isCreate: true,
          owner: {
            id: USFPlayer.getId(player),
            name: player.name
          },
          dimension: player.dimension,
          pos: {
            from: player.land.pos[0],
            to: player.land.pos[1]
          },
          name: results.get("land_name")
        };
        let land = new Land(data);
        let landList = Land.manager.getLandList();
        delete player.land;
        Land.manager.addLand(land);

      }
    })
  }
};


class LandEditGUI extends ScriptUI.ModalFormData {
  constructor(land){
    super();
    this.setTitle("领地编辑");
    this.setButtonsArray([
      {
        typeId: "textField",
        id: "land_name",
        label: "领地名称",
        setting: {
          defaultValue: land.name
        }
      },
      {
        typeId: "toggle",
        id: "land_delete",
        label: "删除领地",
        setting: {
          defaultValue: false
        }
      }
    ]);
    this.setEvents((player, res)=>{
      if(res.get("land_name").length === 0){
        player.sendMessage("领地名不能为空");
        return;
      }
      land.name = res.get("land_name");
      land.owner.name = player.name;
      if(res.get("land_delete")){
        Land.manager.removeLand(land);
      } else {
        Land.manager.saveLand(land);
      }
    });
  }
}