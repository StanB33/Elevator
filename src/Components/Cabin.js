import React from 'react';


function Cabin(props){

  const moveFloor = (newTarget) => {
    props.moveFloor(newTarget)
  }

  const floorButtons = props.floors.map((floor) => {
      return <button value={floor} key={floor} onClick={(e) => moveFloor(e.target.value)}> {floor} </button>
  })


  return (
    <div className='cabinButtons'>
      {floorButtons}
    </div>
  );
}

export default Cabin;
