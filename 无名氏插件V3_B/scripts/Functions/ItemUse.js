import * as mc from "@minecraft/server";
import { UIManager } from "../UserInterfaces/init.js";
import { Land, USFPlayer } from "../API/API.js";
mc.world.beforeEvents.itemUse.subscribe((event)=>{
  if(JSON.parse(mc.world.getDynamicProperty("usf:.openMainItemList")).includes(event.itemStack?.typeId)){
    new (UIManager.getUI("mainGUI"))().sendToPlayer(event.source);
  };
});