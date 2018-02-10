import * as TuoGame from 'tuogame'


export class ArrowController extends TuoGame.Controller{
  constructor(){
    super()
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.refOri = new THREE.Matrix4()
    this.refOri.setPosition(new THREE.Vector3(250,10,1.7))
  }

  onMouseDown(event){
    event.preventDefault()
    this.firstPoint = [event.clientX, event.clientY]
    this.secondPoint = [event.clientX, event.clientY]
    this.isActive = true
    //let e = this.gameComponent.getParameter('matrix').elements
    let M = this.gameComponent.getParameter('matrix').clone()
    let s = M.getMaxScaleOnAxis()
    this.scale = new THREE.Vector3(s,s,s)
    M.extractRotation(M)
    let M1 = new THREE.Matrix4()
    M1.getInverse(this.refOri)
    this.refM = M1.multiply(M)
  }

  onMouseMove(){
    event.preventDefault()
    if(this.isActive)
    {
      this.secondPoint = [event.clientX, event.clientY]
      let dx = this.firstPoint[0] - this.secondPoint[0]
      let dy = this.secondPoint[1] - this.firstPoint[1]
      let dis = Math.sqrt(dx*dx + dy*dy)//*0.015
      if(dis > 0){
        let theta = Math.asin(dx/dis)
        let M1 = new THREE.Matrix4()
        M1.makeRotationZ(theta)
        let M2 = new THREE.Matrix4()
        M2.makeRotationY(Math.PI/10 - Math.PI/6)
        let M3 = new THREE.Matrix4()
        M3.makeTranslation(-dy*0.003,0,0)
        let M4 = this.refOri.clone().multiply(M1).multiply(this.refM).multiply(M2).multiply(M3)
        let speed = new THREE.Vector3(M4.elements[0],
          M4.elements[1], M4.elements[2])
        this.gameComponent.updateParameter('speed', speed.multiplyScalar(0.08*Math.abs(dy)))
        this.gameComponent.updateParameter('matrix', M4.scale(this.scale))
      }
    }


  }

  onMouseUp(){
    this.isActive = false
    TuoGame.eventDispatcher.dispatchEvent({type: 'fire'})
  }

  mountController(){
    this.isActive = false
    TuoGame.container.addEventListener('mousedown', this.onMouseDown)
    TuoGame.container.addEventListener('mousemove', this.onMouseMove)
    TuoGame.container.addEventListener('mouseup', this.onMouseUp)
  }

  umountController(){
    TuoGame.container.removeEventListener('mousedown', this.onMouseDown)
    TuoGame.container.removeEventListener('mousemove', this.onMouseMove)
    TuoGame.container.removeEventListener('mouseup', this.onMouseUp)
  }
}
