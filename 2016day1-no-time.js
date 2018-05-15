let arr1 = ["R2", "L3"]; //5 blocks away
let arr2 = ["R2", "R2", "R2"]; //2 blocks away
let arr3 = ["R5", "L5", "R5", "R3"]; //12 blocks away
let arr4 = ["R8", "R4", "R4", "R8"];
let puzzleInput = ["L1", "L3", "L5", "L3", "R1", "L4", "L5", "R1", "R3", "L5", "R1", "L3", "L2", "L3", "R2", "R2", "L3", "L3", "R1", "L2", "R1", "L3", "L2", "R4", "R2", "L5", "R4", "L5", "R4", "L2", "R3", "L2", "R4", "R1", "L5", "L4", "R1", "L2", "R3", "R1", "R2", "L4", "R1", "L2", "R3", "L2", "L3", "R5", "L192", "R4", "L5", "R4", "L1", "R4", "L4", "R2", "L5", "R45", "L2", "L5", "R4", "R5", "L3", "R5", "R77", "R2", "R5", "L5", "R1", "R4", "L4", "L4", "R2", "L4", "L1", "R191", "R1", "L1", "L2", "L2", "L4", "L3", "R1", "L3", "R1", "R5", "R3", "L1", "L4", "L2", "L3", "L1", "L1", "R5", "L4", "R1", "L3", "R1", "L2", "R1", "R4", "R5", "L4", "L2", "R4", "R5", "L1", "L2", "R3", "L4", "R2", "R2", "R3", "L2", "L3", "L5", "R3", "R1", "L4", "L3", "R4", "R2", "R2", "R2", "R1", "L4", "R4", "R1", "R2", "R1", "L2", "L2", "R4", "L1", "L2", "R3", "L3", "L5", "L4", "R4", "L3", "L1", "L5", "L3", "L5", "R5", "L5", "L4", "L2", "R1", "L2", "L4", "L2", "L4", "L1", "R4", "R4", "R5", "R1", "L4", "R2", "L4", "L2", "L4", "R2", "L4", "L1", "L2", "R1", "R4", "R3", "R2", "R2", "R5", "L1", "L2"];

let travelObj = {
  //initialize the x and y axis, this is the current position
  x: 0,
  y: 0,

  //initialize direction
  currentDirection: "north",

  //placesBeen is every stop made when getting new instruction, ["x, y", "x, y", ...]
  placesBeen: ["0, 0"],

  turnLeft() {
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

  turnRight() {
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

function calculateDistance(x, y) {
  //Distance from starting point to ending point is simply x + y,
  //if you convert negative integers to positive
  return Math.abs(x) + Math.abs(y);
}

function calcPartOne(arr) {
  let leftOrRight = "";
  let numOfBlocks = 0;

  //loop arr, change direction and go forward for each instruction
  arr.forEach( instruction => {
    leftOrRight = instruction.substring(0, 1);
    numOfBlocks = Number(instruction.substring(1, instruction.length));

    if (leftOrRight === "L") {
      travelObj.turnLeft();
    } else {
      travelObj.turnRight();
    }
    travelObj.goForward(numOfBlocks);
  });
}

function calcPartTwo(arr) {
  let leftOrRight = "";
  let numOfBlocks = 0;

  //loop arr and change direction for every instruction
  for (let i = 0; i<arr.length; i++) {
    leftOrRight = arr[i].substring(0, 1);
    numOfBlocks = Number(arr[i].substring(1, arr[i].length));

    if (leftOrRight === "L") {
      travelObj.turnLeft();
    } else {
      travelObj.turnRight();
    }

    //Move forward one step at the time
    for (let j = 0; j<numOfBlocks; j++) {
      travelObj.goForward(1);

      //For every new place we ask ourselves: Have I been here before?
      let haveIBeenHere = travelObj.placesBeen.find( element => {
        return element == travelObj.x + ", " + travelObj.y
      });

      //If yes, we have found the first place, return cooridinates
      if (haveIBeenHere) {
        return haveIBeenHere;
      //else push the cooridinates to placesBeen
      } else {
        travelObj.placesBeen.push([travelObj.x + ", " + travelObj.y])
      }
    }
  }
}


//calcPartOne(puzzleInput);
calcPartTwo(puzzleInput);
console.log(calculateDistance(travelObj.x, travelObj.y));
