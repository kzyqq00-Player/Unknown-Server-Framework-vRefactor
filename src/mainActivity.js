import * as mc from "@minecraft/server"
import "./UserInterfaces/init.js";
import "./Functions/init.js";
import {
	Log
} from "./API/API.js";
import {
	DefaultOptions
} from "./options.js";

const USFVersion = "3.1.0-B";
const MinecraftVersion = [1, 21, 94];

const DefaultDynamicPropValue = [{
		key: "usf:playerGenId",
		value: 1
	},
	{
	  key: "usf:landList",
	  value: JSON.stringify([])
	},
	{
	  key: "usf:customUI",
	  value: JSON.stringify([])
	}
];

function LoadDefaultConfig(obj, stringValue = "") {
	for(let obj of DefaultDynamicPropValue){
	  if(mc.world.getDynamicProperty(obj.key) === undefined){
	    mc.world.setDynamicProperty(obj.key, obj.value);
	  }
	}
	for (let data in obj) {
		if (typeof(obj[data]) === typeof({}) && !Array.isArray(obj[data])) {
			LoadDefaultConfig(obj[data], stringValue + "." + data);
		} else {
			if (mc.world.getDynamicProperty("usf:" + stringValue + "." + data) === undefined) {
				mc.world.setDynamicProperty("usf:" + stringValue + "." + data, JSON.stringify(obj[data]));
				Log.log("usf:" + stringValue + "." + data);
			}
		}
	}
};


mc.world.afterEvents.worldLoad.subscribe(() => {
	Log.log("[USF]--加载中");
	LoadDefaultConfig(DefaultOptions);
	if (mc.world.getDynamicProperty("usf:owner") === undefined) {
		Log.log("服主未选定，输入/usf:func get_owner 选为服主");
	};
	Log.log("[USF]--加载成功");
});