import * as mc from "@minecraft/server";
import {
  Land,
  USFPlayer
} from "../API/API.js";
mc.world.beforeEvents.playerInteractWithEntity.subscribe((event)=>{
  let landList = Land.manager.getLandList();
  for(let land of landList){
    if(land.inLand(event.target) && !land.setting.canIEntity && !(USFPlayer.getId(event.player) === land.owner.id)){
      event.cancel = true;
    }
  };
});