import * as mc from "@minecraft/server"
import "./UserInterfaces/init.js";
import "./Functions/init.js";
import { Log, OpLevel } from "./API/API.js";
import { DefaultOptions } from "./Options.js";


function LoadDefaultConfig(obj, stringValue = ""){
  for(let data in obj){
    if(typeof(obj[data]) === "object" && !Array.isArray(obj[data])){
      LoadDefaultConfig(obj[data], stringValue + "." + data);
    } else {
      if(mc.world.getDynamicProperty(stringValue) === undefined){
        mc.world.setDynamicProperty("usf:" + stringValue + "." + data, JSON.stringify(obj[data]));
      }
    }
  }
};


mc.world.afterEvents.worldLoad.subscribe(()=>{
  LoadDefaultConfig(DefaultOptions);
  let opNameList = JSON.parse(mc.world.getDynamicProperty("usf:.mamagerList"));
  //mc.world.sendMessage(JSON.stringify(opNameList));
  for(let player of mc.world.getAllPlayers()){
    if(opNameList.includes(player.name)){
      OpLevel.setLevel(player, 5);
    }
  }
  Log.log("[USF]--加载成功");
});
