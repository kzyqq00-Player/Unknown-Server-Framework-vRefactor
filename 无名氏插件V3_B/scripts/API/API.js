export class Log {
  static error(message){
    console.error(message);
  }
  static log(message){
    console.log(message);
  }
  static warn(message){
    console.warn(message);
  }
};

export class OpLevel {
  static getLevel(player){
    return player.getDynamicProperty("usf:opLevel");
  }
  static setLevel(player, level){
    player.setDynamicProperty("usf:opLevel", level);
  }
}