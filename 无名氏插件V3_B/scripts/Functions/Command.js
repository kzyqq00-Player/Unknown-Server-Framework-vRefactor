import * as mc from "@minecraft/server";
import {
  USFPlayer,
  Log
} from "../API/API.js";
mc.system.beforeEvents.startup.subscribe((event) => {
  event.customCommandRegistry.registerEnum("usf:function", ["get_owner", "tp", "manager", "reset_owner"]);
  event.customCommandRegistry.registerCommand({
    cheatsRequired: false,
    description: "usf指令",
    permissionLevel: 2,
    name: "usf:func",
    mandatoryParameters: [{
      name: "usf:function",
      type: "Enum"
    }]
  }, (source, arg) => {
    switch(arg){
      case "get_owner":
        if(source.sourceType !== "Entity"){
          return {
            message: "发送者非实体",
            status: 1
          }
          break;
        };
        if(source.sourceEntity.typeId !== "minecraft:player"){
          return {
            message: "发送者非玩家",
            status: 1
          }
          break;
        }
        if(mc.world.getDynamicProperty("usf:owner") !== undefined){
          return {
            message: "设置失败，已有服主",
            status: 1
          }
          break;
        } else {
          mc.world.setDynamicProperty("usf:owner", USFPlayer.getId(source.sourceEntity));
          USFPlayer.opLevel.setLevel(source.sourceEntity, 5);
          return {
            message: "设置成功",
            status: 0
          }
        }
        break;
      case "reset_owner":
        if(source.sourceType === "Server" || USFPlayer.getId(source.sourceEntity) === mc.world.getDynamicProperty("usf:owner")){
          mc.world.setDynamicProperty("usf:owner", undefined);
          USFPlayer.opLevel.setLevel(source.sourceEntity, 0);
          return {
            message: "已重置服主",
            status: 0
          }
        } else {
          return {
            message: "重置失败",
            status: 1
          }
        }
        break;
    }
  });
});