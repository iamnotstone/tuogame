import * as TuoGame from 'tuogame'

export class MovingBox extends TuoGame.GameComponent{
  constructor(obj){
    super(obj)
    let geo = new THREE.BoxGeometry(50,50,50)
    let mat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      specular: 0x303030,
      emissive: 0x202020
    })
    this.threeObj = new THREE.Mesh(geo, mat)
  }
}
