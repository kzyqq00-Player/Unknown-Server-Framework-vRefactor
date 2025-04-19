//等以后有机会整理一下usf代码
import * as mc from "@minecraft/server"

class GetMention {
  static get_di(id) {
    return world.getDimension(id);
  };
  
  
  static get_ban_list() {
    return to_array(parse_json(get_data("ban")), []);
  };
  
  
  static get_items(id) {
    var all = [];
    try {
      var items = overworld.runCommand(`strcuture load items.${id} 0 -64 0`);
    } catch (err) {
      return [];
    };
    if (items.successCount === 1 && !un(chest_block)) {
      var com = chest_block.getComponent("minecraft:inventory").container;
      for (var i = 0; i < com.size; i++) {
        all.push(com.getItem(i));
      }
      return all;
    }
    return [];
  };
  
  
  static get_text(id) {
    var text = dictionary[id]
    if (config.language === 1) {
      text = fixed_texts.ZW[id]
    }
    if (text == undefined) {
      text = fixed_texts.ZN[id]
    }
    if (text == undefined) {
      return t.get_text(id, to_number(config.language), 0)
    }
    return text;
  };
  
  
  static get_player_path(player) {
    return `Players/${player.name}`
  }
}