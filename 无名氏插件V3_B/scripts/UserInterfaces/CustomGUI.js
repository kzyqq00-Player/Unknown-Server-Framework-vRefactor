import {
	ScriptUI
} from "../API/UIAPI.js";
import {
	UIManager
} from "./init.js";
import {
	USFPlayer
} from "../API/API.js";
import * as mc from "@minecraft/server";

function CustomUIIO(mode = 0, UIList = []) {
	let data = JSON.parse(mc.world.getDynamicProperty("usf:customUI"));
	switch (mode) {
		case 0:
		case "get":
			return data;
			break;
		case 1:
		case "set":
			mc.world.setDynamicProperty("usf:customUI", UIList);
			break;
	}
};

class CustomUI {
	constructor(uiType) {
		this.type = uiType;
	};
	toString() {
		let str = `${this.type}|${this.title}|${this.info}|${this.buttonList}`;
	}
}

class CustomManagerGUI extends ScriptUI.ActionFormData {
	constructor() {
		super();
		this.setTitle("自定义界面");
		this.setButtonsArray([{
			buttonDef: {
				text: "添加自定义界面"
			},
			event: (player) => {
				new AddCustomUI().sendToPlayer(player);
			}
		}]);
	};
};

class AddCustomUIType extends ScriptUI.ModalFormData {
	constructor() {
		super();
		this.setTitle(`添加自定义界面`);
		
		this.setButtonsArray([
		  {
		    type: "dropdown",
		    id: "ui_type",
		    label: "界面类型",
		    setting: {
		      items: ["列表", "表单"]
		    }
		  },
		  {
		    type: "textField",
		    id: "ui_title",
		    label: "名称",
		    setting: {
		      defaultValue: ""
		    }
		  }
		]);
		this.setBeforeSendEvents((player, res) => {
		  if(res.get("ui_type") === 0){
		    new CustomListUIOptions(res.get("ui_title")).sendToPlayer(player);
		  }
		});
	}
};


class CustomListUIOptions extends ScriptUI.ActionFormData {
	constructor(uiTitle, uiData = []) {
		let tempData = uiData;
		this.setTitle("自定义列表UI");
		for (let ui of tempData) {
		  let buttonCopy = {...ui};
		  buttonCopy.event = (player)=>{
		    
		  }
			this.addButton(ui);
		};
		this.addButton({
			buttonDef: {
				text: "添加按钮"
			},
			event: (player) => {
				tempData.push({
					buttonDef: {
						text: "按钮"
					},
					event: (player) => {
						for(let command of this.commandList){
						  player.runCommand(command);
						}
					},
					commandList: []
				});
				new CustomListUIOptions(uiTitle, tempData).sendToPlayer(player);
			}
		});
	};
}