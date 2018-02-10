import * as TuoGame from 'tuogame'

export class CameraController extends TuoGame.Controller{
  constructor(){
    super()
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  onMouseDown(event){
    event.preventDefault()
    this.firstPoint = [event.clientX, event.clientY]
    this.secondPoint = [event.clientX, event.clientY]
    this.isActive = true
    //let e = this.gameComponent.getParameter('matrix').elements
    this.oriMatrix = this.gameComponent.matrix.clone()
  }
  onMouseMove(){
    event.preventDefault()
    if(this.isActive)
    {
      //let M0 = new THREE.Matrix4()
      //M0.makeRotationY(Math.PI/10 - Math.PI/6)
      //let M1 = this.oriMatrix.clone().multiply(M0)
      this.secondPoint = [event.clientX, event.clientY]
      let dx = this.firstPoint[0] - this.secondPoint[0]
      let dy = this.secondPoint[1] - this.firstPoint[1]
      let dis = Math.sqrt(dx*dx + dy*dy)//*0.015
      if(dis > 0){
        let theta = Math.asin(dx/dis)
        let M1 = new THREE.Matrix4()
        M1.makeRotationY(theta)
        let M2 = this.oriMatrix.clone().multiply(M1)
        this.gameComponent.matrix = M2
        this.gameComponent.matrix.decompose(
          this.gameComponent.position, 
          this.gameComponent.quaternion, 
          this.gameComponent.scale)
      }
    }
  }

  onMouseUp(){
    this.isActive = false
  }

  mountController(){
    this.isActive = false
    TuoGame.container.addEventListener('mousedown', this.onMouseDown)
    TuoGame.container.addEventListener('mousemove', this.onMouseMove)
    TuoGame.container.addEventListener('mouseup', this.onMouseUp)
  }

  umountController(){

  }

}
