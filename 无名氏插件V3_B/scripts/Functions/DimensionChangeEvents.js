import * as mc from "@minecraft/server";

mc.world.afterEvents.playerDimensionChange.subscribe((event)=>{
  delete event.player.land;
})