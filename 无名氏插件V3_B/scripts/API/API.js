import * as mc from "@minecraft/server"

export class Vector {
  static add(vector1, vector2) {
    return {
      x: vector1.x + vector2.x,
      y: vector1.y + vector2.y,
      z: vector1.z + vector2.z
    };
  };
  static faceLocation(theVector, theDistance, theRotation) {
    let faceVector_y = (theVector.y - Math.sin(theRotation.x * Math.PI / 180) * theDistance);
    let faceVector_r = (Math.cos(theRotation.x * Math.PI / 180) * theDistance);
    let faceVector_x = (theVector.x - faceVector_r * Math.sin(theRotation.y * Math.PI / 180));
    let faceVector_z = (theVector.z + faceVector_r * Math.cos(theRotation.y * Math.PI / 180));
    let finallyVector = {
      x: faceVector_x,
      y: faceVector_y,
      z: faceVector_z
    };
    return finallyVector;
  };
  static mul(vector, num) {
    return {
      x: vector.x * num,
      y: vector.y * num,
      z: vector.z * num
    };
  }
  static distance(Vector1, Vector2) {
    let TheDistance = Math.sqrt(Math.pow((Vector1.x - Vector2.x), 2) + Math.pow((Vector1.y - Vector2.y), 2) + Math.pow((Vector1.z - Vector2.z), 2));
    return TheDistance;
  }
};

export class Log {
  static error(message) {
    console.error(message);
  }
  static log(message) {
    console.log(message);
  }
  static warn(message) {
    console.warn(message);
  }
};

export class Land {
  /*
    data: {
      pos : {
        from: Vector3,
        to: Vector3
      }
    }
  */
  constructor(data) {
    //破坏方块 放置方块 与实体交互 与方块交互
    this.setting = {
      canBreak: false,
      canPlace: false,
      canIEntity: false,
      canIBlock: false
    };
    this.dimensionId = data.dimension.id;
    this.member = [];
    this.ownerId = data.ownerId;
    if (data.isCreate) {
      this.pos = {
        max: {
          x: (data.pos.from.x > data.pos.to.x ? data.pos.from.x : data.pos.to.x),
          y: (data.pos.from.y > data.pos.to.y ? data.pos.from.y : data.pos.to.y),
          z: (data.pos.from.z > data.pos.to.z ? data.pos.from.z : data.pos.to.z)
        },
        min: {
          x: (data.pos.from.x < data.pos.to.x ? data.pos.from.x : data.pos.to.x),
          y: (data.pos.from.y < data.pos.to.y ? data.pos.from.y : data.pos.to.y),
          z: (data.pos.from.z < data.pos.to.z ? data.pos.from.z : data.pos.to.z)
        }
      };
    } else {
      this.pos = data.pos;
    }
    this.centerPos = {
      x: (this.pos.max.x + this.pos.min.x) / 2,
      y: (this.pos.max.y + this.pos.min.y) / 2,
      z: (this.pos.max.z + this.pos.min.z) / 2
    };
    if (data.member !== undefined) {
      this.member = data.member;
    };
    if (data.setting !== undefined) {
      this.setting = data.setting;
    }
  };
  inLand(pos) {
    if (pos.x > this.pos.min.x && pos.x < this.pos.max.x && pos.y > this.pos.min.y && pos.y < this.pos.max.y && pos.z > this.pos.min.z && pos.z < this.pos.max.z) {
      return true;
    }
    return false;
  };
  coincide(oland) {
    if (this.dimensionId !== oland.dimensionId) return false;
    if ((this.pos.min.x > oland.pos.max.x || this.pos.max.x < oland.pos.min.x) || (this.pos.min.y > oland.pos.max.y || this.pos.max.y < oland.pos.min.y) || (this.pos.min.z > oland.pos.max.z || this.pos.max.z < oland.pos.min.z)) {
      return false;
    }
    return true;
  }
};


export class USFPlayer {
  static opLevel = {
    getLevel: (player) => {
      return player.getDynamicProperty("usf:opLevel");
    },
    setLevel(player, level) => {
      player.setDynamicProperty("usf:opLevel", level);
    }
  }
  static getId = (player) => {
    if (player.getDynamicProperty("usf:playerId") === undefined) {
      player.setDynamicProperty("usf:playerId", mc.world.getDynamicProperty("usf:playerGenId"));
      mc.world.setDynamicProperty("usf:playerGenId", mc.world.getDynamicProperty("usf:playerGenId") + 1);
    }
    return player.getDynamicProperty("usf:playerId");
  };
}