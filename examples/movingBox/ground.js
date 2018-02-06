import * as TuoGame from 'tuogame'

export class Ground extends TuoGame.GameComponent{
  constructor(obj){
    super(obj)
    this.threeObj = this.makeGround(2000, 2000)  
  }

  makeGround(width, length){
    let geo = new THREE.BufferGeometry()
    let ver = new Float32Array([
      0,0,0,
      length, 0, 0,
      length, width, 0,
      length, width, 0,
      0,width, 0,
      0,0,0
    ])
    let nol = new Float32Array([
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
    ])
    let uv = new Float32Array([
      0,1,
      1,1,
      1,0,
      1,0,
      0,0,
      0,1      
    ])
    geo.addAttribute('position', new THREE.BufferAttribute(ver,3))
    geo.addAttribute('normal', new THREE.BufferAttribute(nol,3))
    geo.addAttribute('uv', new THREE.BufferAttribute(uv,2))
    let loader = new THREE.TextureLoader()
    let texture = loader.load('/Floors.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10,10)
    var mat = new THREE.MeshPhongMaterial({
      color: 0x8b8682,
      specular: 0x303030,
      emissive: 0x202020,
      map: texture
    })
    return new THREE.Mesh(geo, mat)
  }



}
