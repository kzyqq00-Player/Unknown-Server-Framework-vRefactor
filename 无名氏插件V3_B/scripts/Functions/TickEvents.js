import * as mc from "@minecraft/server";
import {
  Land,
  USFPlayer
} from "../API/API.js";

let tick = 0;

mc.system.runInterval(() => {
  tick++;
  if (tick % 4 === 0) {
    for (let player of mc.world.getAllPlayers()) {
      if (player?.land?.create) {
        if (player.onScreenDisplay.isValid) {
          player.onScreenDisplay.setActionBar(`创建领地中\n请空手选择起点、终点\n打开菜单创建\n潜行打开菜单取消创建\n已选点数：${player.land.pos.length}`);
        }
        if (player.land.pos?.length >= 2) {
          //范围渲染
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
          let molangMap = new mc.MolangVariableMap();
          molangMap.setColorRGB("variable.color", {
            red: 0.0,
            green: 1.0,
            blue: 1.0,
            alpha: 1.0
          });
          molangMap.setVector3("variable.direction", {
            x: 0,
            y: 0,
            z: 0
          });
          for (let pos_x = land.pos.min.x; pos_x <= land.pos.max.x + 1; pos_x += 1) {
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: pos_x,
              y: land.pos.min.y,
              z: land.pos.min.z
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: pos_x,
              y: land.pos.max.y + 1,
              z: land.pos.min.z
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: pos_x,
              y: land.pos.min.y,
              z: land.pos.max.z + 1
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: pos_x,
              y: land.pos.max.y + 1,
              z: land.pos.max.z + 1
            }, molangMap);
          };
          for (let pos_y = land.pos.min.y; pos_y <= land.pos.max.y + 1; pos_y += 1) {
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.min.x,
              y: pos_y,
              z: land.pos.min.z
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.max.x + 1,
              y: pos_y,
              z: land.pos.min.z
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.min.x,
              y: pos_y,
              z: land.pos.max.z + 1
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.max.x + 1,
              y: pos_y,
              z: land.pos.max.z + 1
            }, molangMap);
          };
          for (let pos_z = land.pos.min.z; pos_z <= land.pos.max.z + 1; pos_z += 1) {
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.min.x,
              y: land.pos.min.y,
              z: pos_z
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.min.x,
              y: land.pos.max.y + 1,
              z: pos_z
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.max.x + 1,
              y: land.pos.min.y,
              z: pos_z
            }, molangMap);
            player.dimension.spawnParticle("minecraft:blue_flame_particle", {
              x: land.pos.max.x + 1,
              y: land.pos.max.y + 1,
              z: pos_z
            }, molangMap);
          }

        }
      };
      {
        let landList = Land.manager.getLandList({
          position: player.location
        });
        if (landList.length > 0) {
          if (player.onScreenDisplay.isValid) {
            player.onScreenDisplay.setActionBar(`你在{${landList[0].owner.name}}的领地中\n身份：${(USFPlayer.getId(player) === landList[0].owner.id ? "领地主" : "客人")}`);
          }
        }
      }
    }
  }
  if (tick === 20) tick = 0;
}, 0);