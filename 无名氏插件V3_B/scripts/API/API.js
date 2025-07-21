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
};

export class Land {
  constructor(pos, size){
    //破坏方块 放置方块 与实体交互 与方块交互
    this.setting = {
      canBreak: false,
      canPlace: false,
      canIEntity: false,
      canIBlock: false
    }
    this.pos = {
      max: {
        x: (pos.x > (pos.x + size.x) ? pos.x : (pos.x + size.x)),
        y: (pos.y > (pos.y + size.y) ? pos.y : (pos.y + size.y)),
        z: (pos.z > (pos.z + size.z) ? pos.z : (pos.z + size.z))
      },
      min: {
        x: (pos.x < (pos.x + size.x) ? pos.x : (pos.x + size.x)),
        y: (pos.y < (pos.y + size.y) ? pos.y : (pos.y + size.y)),
        z: (pos.z < (pos.z + size.z) ? pos.z : (pos.z + size.z))
      }
    }
  };
  inLand(pos){
    if(pos.x > this.pos.min.x && pos.x < this.pos.max.x && pos.y > this.pos.min.y && pos.y < this.pos.max.y && pos.z > this.pos.min.z && pos.z < this.pos.max.z){
      return true;
    }
    return false;
  };
  
}