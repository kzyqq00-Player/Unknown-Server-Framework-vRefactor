import * as mc from "@minecraft/server";
import {
  Land,
  USFPlayer
} from "../API/API.js";
mc.world.beforeEvents.playerPlaceBlock.subscribe((event)=>{
  let landList = Land.manager.getLandList();
  for(let land of landList){
    if(land.inLand(event.block) && !land.setting.canPlace && !(USFPlayer.getId(event.player) === land.owner.id)){
      event.cancel = true;
    }
  };
});