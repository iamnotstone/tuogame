import {removeGameComponent} from './core'

export class GameComponent {
  constructor(obj){
    this.threeObj = obj
    this.updateMatrix = this.updateMatrix.bind(this)
    this.parameters = {
      matrix: {
        value: new THREE.Matrix4(),
        update: this.updateMatrix
      }
    }
  }

  updateMatrix(value){
    this.parameters.matrix.value = value
    this.threeObj.matrix = value
    this.threeObj.matrix.decompose(this.threeObj.position, 
      this.threeObj.quaternion, this.threeObj.scale)
  }

  getParameter(name){
    return this.parameters[name].value
  }

  updateParameter(name, value){
    this.parameters[name].update(value)
  }

  dispose(){
    removeGameComponent(this)
  }
}
