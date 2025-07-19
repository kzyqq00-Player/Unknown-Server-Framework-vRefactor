import * as mc from "@minecraft/server"
import "./UserInterfaces/init.js";
import "./Functions/init.js";
import { Log } from "./API/API.js";
import { DefaultOptions } from "./Options.js";


function LoadLog(obj, stringValue = ""){
  for(let data in obj){
    if(typeof(obj[data]) === "object" && !Array.isArray(obj[data])){
      LoadLog(obj[data], stringValue + "." + data);
    } else {
      if(mc.world.getDynamicProperty(stringValue) === undefined){
        mc.world.setDynamicProperty("usf:" + stringValue + "." + data, JSON.stringify(obj[data]));
        //mc.world.sendMessage("usf:" + stringValue + "." + data + ": " + mc.world.getDynamicProperty("usf:" + stringValue + "." + data));
      }
    }
  }
};


mc.world.afterEvents.worldLoad.subscribe(()=>{
  
  LoadLog(DefaultOptions);
  Log.log("[USF]--加载成功");
});
