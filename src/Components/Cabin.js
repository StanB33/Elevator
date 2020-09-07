import React from 'react';


function Cabin(props){
  const [floors, setFloors] = React.useState(props.floors)
  const [active, setActive] = React.useState(props.activeFloor)
  const [target, setTarget] = React.useState(props.targetFloor)


  const moveFloor = (newTarget) => {
    props.moveFloor(newTarget)
  }

  const floorButtons = floors.map((floor) => {
      return <button value={floor} onClick={(e) => moveFloor(e.target.value)}> {floor} </button>
  })


  return (
    <div className='cabinButtons'>
      {floorButtons}
    </div>
  );
}

export default Cabin;
