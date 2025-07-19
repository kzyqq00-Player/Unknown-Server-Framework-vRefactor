import * as mc from "@minecraft/server";
import { UIManager } from "../UserInterfaces/init.js";

mc.world.beforeEvents.playerInteractWithBlock.subscribe((event)=>{
  if(JSON.parse(mc.world.getDynamicProperty("usf:.openMainItemList")).includes(event.itemStack.typeId)){
    new (UIManager.getUI("mainGUI"))().sendToPlayer(event.player);
  }
});