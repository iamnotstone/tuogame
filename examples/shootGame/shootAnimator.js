import * as TuoGame from 'tuogame'

const g = new THREE.Vector3(0,0,-9.8)

export class ShootAnimator extends TuoGame.Animator{
  init(){
    this.oriMatrix = this.obj.getParameter('matrix').clone()
    let s = this.oriMatrix.getMaxScaleOnAxis()
    this.scale = new THREE.Vector3(s,s,s)
    this.oriMatrix.extractRotation(this.oriMatrix)
    this.speed = this.obj.getParameter('speed').clone()
    let z = new THREE.Vector3(0,0,1)
    let vH = this.speed.clone().dot(z)
    this.vSpeed = new THREE.Vector3(0,0,vH)
    this.hSpeed = this.speed.clone().sub(this.vSpeed)
  }

  exec(){
    let currentT = new Date().getTime()
    let detaT = (currentT - this.startT)*0.001
    let hDis = this.hSpeed.clone().multiplyScalar(detaT)
    let vDis = this.vSpeed.clone()
      .multiplyScalar(detaT).add(g.clone()
      .multiplyScalar(0.5*detaT*detaT))
    let dis = hDis.add(vDis)
    let curVSpeed = this.vSpeed.clone().add(g.clone().multiplyScalar(detaT))
    let curSpeed = curVSpeed.add(this.hSpeed)
    let angle = this.speed.angleTo(curSpeed)
    let oriRev = new THREE.Matrix4()
    oriRev.getInverse(this.oriMatrix)
    oriRev.setPosition(new THREE.Vector3(0,0,0))
    let rotAxi = this.speed.clone().cross(curSpeed)
    let refAxi = rotAxi.applyMatrix4(oriRev)
    let rotateM = new THREE.Matrix4()
    rotateM.makeRotationAxis(refAxi.normalize(), angle)
    let translateM = new THREE.Matrix4()
    translateM.makeTranslation(dis.x, dis.y, dis.z)
    let M = this.oriMatrix.clone().multiply(rotateM).premultiply(translateM)
    this.obj.updateParameter('matrix', M.scale(this.scale))
  }
}
