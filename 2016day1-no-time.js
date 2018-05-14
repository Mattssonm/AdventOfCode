let arr1 = ["R2", "L3"]; //5 blocks away
let arr2 = ["R2", "R2", "R2"]; //2 blocks away
let arr3 = ["R5", "L5", "R5", "R3"]; //12 blocks away
let puzzleInput = ["L1", "L3", "L5", "L3", "R1", "L4", "L5", "R1", "R3", "L5", "R1", "L3", "L2", "L3", "R2", "R2", "L3", "L3", "R1", "L2", "R1", "L3", "L2", "R4", "R2", "L5", "R4", "L5", "R4", "L2", "R3", "L2", "R4", "R1", "L5", "L4", "R1", "L2", "R3", "R1", "R2", "L4", "R1", "L2", "R3", "L2", "L3", "R5", "L192", "R4", "L5", "R4", "L1", "R4", "L4", "R2", "L5", "R45", "L2", "L5", "R4", "R5", "L3", "R5", "R77", "R2", "R5", "L5", "R1", "R4", "L4", "L4", "R2", "L4", "L1", "R191", "R1", "L1", "L2", "L2", "L4", "L3", "R1", "L3", "R1", "R5", "R3", "L1", "L4", "L2", "L3", "L1", "L1", "R5", "L4", "R1", "L3", "R1", "L2", "R1", "R4", "R5", "L4", "L2", "R4", "R5", "L1", "L2", "R3", "L4", "R2", "R2", "R3", "L2", "L3", "L5", "R3", "R1", "L4", "L3", "R4", "R2", "R2", "R2", "R1", "L4", "R4", "R1", "R2", "R1", "L2", "L2", "R4", "L1", "L2", "R3", "L3", "L5", "L4", "R4", "L3", "L1", "L5", "L3", "L5", "R5", "L5", "L4", "L2", "R1", "L2", "L4", "L2", "L4", "L1", "R4", "R4", "R5", "R1", "L4", "R2", "L4", "L2", "L4", "R2", "L4", "L1", "L2", "R1", "R4", "R3", "R2", "R2", "R5", "L1", "L2"];

let travelObj = {
  //initialize the x and y axis
  x: 0,
  y: 0,

  //initialize direction
  currentDirection: "north",

  goLeft() {
    switch(this.currentDirection) {
      case "north":
        this.currentDirection = "west";
        break;
      case "east":
        this.currentDirection = "north";
        break;
      case "south":
        this.currentDirection = "east";
        break;
      case "west":
        this.currentDirection = "south";
        break;
    }
  },

  goRight() {
    switch(this.currentDirection) {
      case "north":
        this.currentDirection = "east";
        break;
      case "east":
        this.currentDirection = "south";
        break;
      case "south":
        this.currentDirection = "west";
        break;
      case "west":
        this.currentDirection = "north";
        break;
    }
  },

  goForward(blocks) {
    switch(this.currentDirection) {
      case "north":
        this.y += blocks;
        break;
      case "east":
        this.x += blocks;
        break;
      case "south":
        this.y -= blocks;
        break;
      case "west":
        this.x -= blocks;
        break;
    }
  }
};

function calculateDistance(arr) {
  let leftOrRight = "";
  let numOfBlocks = 0;

  //loop arr, change direction and go forward for each instruction
  arr.forEach( instruction => {
    leftOrRight = instruction.substring(0, 1);
    numOfBlocks = Number(instruction.substring(1, instruction.length));

    if (leftOrRight === "L") {
      travelObj.goLeft();
    } else {
      travelObj.goRight();
    }
    travelObj.goForward(numOfBlocks);
  });

  //Distance from starting point to ending point is simply x + y,
  //if you convert negative integers to positive

  return Math.abs(travelObj.x) + Math.abs(travelObj.y);
}

calculateDistance(puzzleInput);
