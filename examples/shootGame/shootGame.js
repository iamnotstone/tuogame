import * as TuoGame from 'tuogame'
import {Ground} from './ground'
import {Arrow} from './arrow'
import {ArrowController} from './arrowController'
import {CameraController} from './cameraController'
import {ShootAnimator} from './shootAnimator'

export class ShootGame extends TuoGame.GameBase{
  constructor(props){
    super(props)
    this.fire = this.fire.bind(this)
  }

  prevCondition(){
    let p1 = new Promise((resolve, reject) => {
      let loader = new THREE.VRMLLoader()
      loader.load('/weapon1.wrl', (obj) => resolve(obj), undefined, () => reject())
    })
    return p1.then((obj) => {
      this.weaponModel = obj
    })
  }
  
  initGame(){
    TuoGame.camera.position.set(250,10,1.7)
    TuoGame.camera.lookAt(250,100,1.7)
    //
    //TuoGame.camera.position.set(250,10,15)
    //TuoGame.camera.lookAt(250,10,0)
    TuoGame.scene.background = new THREE.Color(0xf2f7ff)
    TuoGame.scene.fog = new THREE.Fog( 0xf2f7ff, 1, 300 );
    let grd = new Ground()
    TuoGame.addGameComponent(grd)
    this.loadWeapon()
    this.arrowCon = new ArrowController()
    this.arrowCon.load(this.weapon)
    this.cameraCon = new CameraController()
    this.cameraCon.load(TuoGame.camera)

    TuoGame.eventDispatcher.addEventListener('fire', this.fire)
  }

  loadWeapon(){
    let oldMatrix = this.weaponModel.matrix.clone()
    let rot = new THREE.Matrix4().makeRotationZ(Math.PI/2)
    let rot1 = new THREE.Matrix4().makeRotationX(Math.PI/10)
    let tra = new THREE.Matrix4().setPosition(new THREE.Vector3(250.1,12,1.2))
    oldMatrix.premultiply(rot).premultiply(rot1).premultiply(tra)
    oldMatrix.scale(new THREE.Vector3(0.1,0.1,0.1))
    this.weapon = new Arrow(this.weaponModel.clone())
    this.weapon.updateParameter('matrix', oldMatrix)
    TuoGame.addGameComponent(this.weapon)
  }

  fire(){
    console.log('fire in the hole')
    this.arrowCon.unload()
    let ani = new ShootAnimator(this.weapon)
    ani.load()
  }
}

