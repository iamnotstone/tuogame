import * as TuoGame from 'tuogame'
export class Arrow extends TuoGame.GameComponent{
  constructor(obj){
    super(obj)
    this.updateSpeed = this.updateSpeed.bind(this)
    this.parameters.speed = {
      value: new THREE.Vector3(0,0,0),
      update: this.updateSpeed
    }
  }

  updateSpeed(value){
    this.parameters.speed.value = value
  }
}
