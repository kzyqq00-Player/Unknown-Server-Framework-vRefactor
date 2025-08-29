import * as mc from "@minecraft/server";
import {
  USFPlayer
} from "../API/API.js";
mc.world.afterEvents.playerSpawn.subscribe((event)=>{
  if(event.initialSpawn){
    USFPlayer.getId(event.player);
  }
});