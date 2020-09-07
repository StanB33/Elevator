import React, { useState, useEffect } from 'react';
import Cabin from './Components/Cabin.js'

function App() {
  const [floors] = useState([4, 3, 2, 1, 0]);
  const [activeFloor, setActiveFloor] = useState(0);
  const [targetFloors, setTargetFloors] = useState([]);
  const [doors, setDoors] = useState("closed");
  const [direction, setDirection] = useState("none");

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const moveFloor = (newTarget) => {
    const target = targetFloors;
    target.push(newTarget);
    setTargetFloors(target.sort((a, b) => a - b));
    console.log("a");
    if (direction === "none" && targetFloors.length === 1) {
      console.log("aa");
      theDoors();
    }
  };

  const theDoors = async () => {
    console.log("c");
    if (doors === "closed" && targetFloors.includes(`${activeFloor}`)) {
      setDoors("open");
      await sleep(2000);
      setDoors("closed");
      let traveled = targetFloors.filter((item) => item != activeFloor);
      setTargetFloors(traveled);
      await sleep(2000);
    }
    traveling();
  };

  const traveling = async () => {
    console.log("b");
    await directionToGo();
    console.log("e");
    await sleep(2000);
    console.log(direction);
    if (direction === "up" && doors === "closed") {
      setActiveFloor(activeFloor + 1);
      traveling();
    }
    if (direction === "down" && doors === "closed") {
      setActiveFloor(activeFloor - 1);
      console.log("f");
    }
    console.log("g");
    console.log(floors);
    console.log(activeFloor);
    console.log(targetFloors);
    console.log(doors);
    console.log(direction);
  };

  const directionToGo = async () => {
    console.log("d");
    if (
      targetFloors[targetFloors.length - 1] > activeFloor &&
      direction === "none"
    ) {
      setDirection("up");
      console.log("ddd");
    } else if (targetFloors[0] < activeFloor && direction === "none") {
      const test = "down";
      setDirection(test);
      console.log("dd");
    }
  };

  const floorButtons = floors.map((floor) => {
    if (activeFloor === floor && doors === "open") {
      return (
        <div className="container" key={floor}>
          <div className="buttonContainer">
            <button
              className="floorButton"
              value={floor}
              onClick={(e) => moveFloor(e.target.value)}
            >
              {" "}
              O{" "}
            </button>
          </div>
          <div className="cabinOpen">
            <div className="cabinFloor">{floor}</div>
            <Cabin
              floors={floors}
              activeFloor={activeFloor}
              targetFloors={targetFloors}
              moveFloor={moveFloor}
            />
          </div>
        </div>
      );
    } else if (activeFloor === floor) {
      return (
        <div className="container" key={floor}>
          <div className="buttonContainer">
            <button
              className="floorButton"
              value={floor}
              onClick={(e) => moveFloor(e.target.value)}
            >
              {" "}
              O{" "}
            </button>
          </div>
          <div className="cabinClosed">
            <div className="cabinFloor">{floor}</div>
            <Cabin
              floors={floors}
              activeFloor={activeFloor}
              targetFloors={targetFloors}
              moveFloor={moveFloor}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container" key={floor}>
          <div className="buttonContainer">
            <button
              className="floorButton"
              value={floor}
              onClick={(e) => moveFloor(e.target.value)}
            >
              {" "}
              O{" "}
            </button>
          </div>
          <div className="cabin">
            <div className="cabinFloor">{floor}</div>
          </div>
        </div>
      );
    }
  });

  return (
    <div>
      {targetFloors[0]} <br />
      {direction} <br />
      {activeFloor}
      {floorButtons}
    </div>
  );
}

export default App;
