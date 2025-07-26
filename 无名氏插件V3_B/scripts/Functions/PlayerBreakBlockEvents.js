import * as mc from "@minecraft/server";
import {
  Land,
  USFPlayer
} from "../API/API.js";
mc.world.beforeEvents.playerBreakBlock.subscribe((event)=>{
  let landList = Land.manager.getLandList();
  for(let land of landList){
    if(land.inLand(event.block) && !land.setting.canBreak && !(USFPlayer.getId(event.player) === land.owner.id)){
      event.cancel = true;
    }
  };
});