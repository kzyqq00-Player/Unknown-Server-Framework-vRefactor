import * as mc from "@minecraft/server";
import { UIManager } from "../UserInterfaces/init.js";
import { Land } from "../API/API.js";

mc.world.beforeEvents.playerInteractWithBlock.subscribe((event)=>{
  //打开菜单物品检测
  if(JSON.parse(mc.world.getDynamicProperty("usf:.openMainItemList")).includes(event.itemStack.typeId)){
    new (UIManager.getUI("mainGUI"))().sendToPlayer(event.player);
  };
  
  //领地交互检测
  let landList = mc.world.getDynamicProperty("usf:land");
  if(landList === undefined){
    landList = [];
  } else {
    landList = JSON.prase(landList);
  };
  for(let land in landList){
    let landData = new Land(land);
    if(landData.inLand(event.block) && !landData.setting.canIBlock){
      event.cancel = true;
    }
  }
});