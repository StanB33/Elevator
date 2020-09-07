import React from 'react';
import Cabin from './Components/Cabin.js'

class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       floors: [4,3,2,1,0],
       activeFloor: 0,
       targetFloors: [],
       doors: 'closed',
       direction: 'none',
     }
   }

   sleep = (ms) => {
     return new Promise(
       resolve => setTimeout(resolve, ms)
     );
   }

   closeDoor = async () => {
     if (this.state.targetFloors[this.state.targetFloors.length - 1] > this.state.activeFloor && this.state.direction === 'none') {
       this.setState({direction: 'up'})
     } else if (this.state.targetFloors[0] < this.state.activeFloor && this.state.direction === 'none') {
       this.setState({direction: 'down'})
     }
     if (this.state.doors === 'open') {
        await this.sleep(2000)
        this.setState({doors: 'closed'})
      }
      return null
    }

    openDoor = async () => {
      if (this.state.doors === 'closed' && this.state.targetFloors.includes(`${this.state.activeFloor}`)) {
        await this.sleep(2000)
        let traveled = await this.state.targetFloors.filter(item => item !== `${this.state.activeFloor}`);
        this.setState({doors: 'open', targetFloors: traveled})
     }
     return null
   }

     up = async () => {
       await this.sleep(2000)
       let up = this.state.activeFloor
       up++
       this.setState({activeFloor: up})
       if (this.state.targetFloors[this.state.targetFloors.length - 1] == this.state.activeFloor){
         this.setState({direction: 'none'})
       }
       return null
     }

      down = async () => {
       await this.sleep(2000)
       let down = this.state.activeFloor
       down--
       this.setState({activeFloor: down})
       if (this.state.targetFloors[0] == this.state.activeFloor){
         this.setState({direction: 'none'})
       }return null
      }

      moveFloor = async (newTarget)  => {
        const target = this.state.targetFloors
        target.push(newTarget)
        target.sort((a, b) => a - b);
        this.setState({targetFloors: target})
        if (newTarget == this.state.activeFloor && this.state.direction === 'none'){
          this.openDoor()
        }
        if (this.state.direction === 'none' && this.state.targetFloors.length == 1){
            await this.traveling()
        }
      }

    traveling = async () => {
      await this.closeDoor()
     if (this.state.direction === 'up' && this.state.doors === 'closed'){
         await this.up()
         await this.openDoor()
         await this.closeDoor()
         await this.traveling()

     }
     if (this.state.direction === 'down' &&  this.state.doors === 'closed'){
         await this.down()
         await this.openDoor()
         await this.closeDoor()
         await this.traveling()

     }

   }

render() {

  const floorButtons = this.state.floors.map((floor) => {
    if (this.state.activeFloor === floor && this.state.doors === 'open'){
      return <div className='container'>
      <div className='buttonContainer'>
      <button className="floorButton" value={floor} onClick={(e) => this.moveFloor(e.target.value)}> O </button>
      </div>
      <div className="cabinOpen">
          <div className='cabinFloor'>{floor}</div>
        <Cabin floors={this.state.floors} activeFloor={this.state.activeFloor} targetFloors={this.state.targetFloors} moveFloor={this.moveFloor}/>
        </div>
      </div>
    } else if (this.state.activeFloor === floor) {
      return <div className='container'>
      <div className='buttonContainer'>
        <button className="floorButton" value={floor} onClick={(e) => this.moveFloor(e.target.value)}> O </button>
      </div>
      <div className="cabinClosed">
        <div className='cabinFloor'>{floor}</div>
        <Cabin floors={this.state.floors} activeFloor={this.state.activeFloor} targetFloors={this.state.targetFloors} moveFloor={this.moveFloor}/>
        </div>
      </div>
    } else {
      return <div className="container">
        <div className='buttonContainer'>
        <button className="floorButton" value={floor} onClick={(e) => this.moveFloor(e.target.value)}> O </button>
        </div>
        <div className="cabin">
          <div className='cabinFloor'>{floor}</div>
        </div>
      </div>
    }
  })

  return <div>
      {floorButtons}
    </div>
  }
}



export default App;
