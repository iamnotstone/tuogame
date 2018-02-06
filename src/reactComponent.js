import React from 'react'

var scene, camera, globalGroup, container;
var componentCount = 0

class ReactComponent extends React.Component{
  constructor(props){
    super(props)
    this.animate = this.animate.bind(this)
    this._onDocumentResize = this._onDocumentResize.bind(this)
  }

  initThree(){
    scene = new THREE.Scene()
		scene.background = new THREE.Color(0xb39c9c)
	  camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 1000)
		
		camera.position.set(0, 0, 1000)
		this.light = new THREE.PointLight(0xf0f0f0,1)
		camera.add(this.light)
		scene.add(camera)
	  this.renderer = new THREE.WebGLRenderer({antialias: true})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.width, this.height)
		container.appendChild(this.renderer.domElement)

    globalGroup = new THREE.Group()
    scene.add(globalGroup)
    this.animate()
    
	}

  animate(){
    requestAnimationFrame(this.animate)
    this.renderer.render(scene, camera)
  }

  componentWillMount(){
    if(componentCount > 1)
      throw 'can not mount two reactgame.ReactComponent in the mean time'
    componentCount ++
  }

  componentWillUnmount(){
    if(componentCount > 0)
      componentCount --
  }

  componentDidMount(){
    this.width = container.offsetWidth
    this.height = container.offsetHeight
	  this.initThree()
    container.addEventListener('touchstart', this._onDocumentTouchStart, false);
    container.addEventListener('touchmove', this._onDocumentTouchMove, false);  
		window.addEventListener('resize', this._onDocumentResize, false)
		//this.setState({})
	}

  _onDocumentResize(){
    this.width = container.offsetWidth
    this.height = container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    camera.aspect = this.width / this.height
    camera.updateProjectionMatrix()
  }

  render(){
    return <div
      ref = {node => container = node}
      style = {{
        height: '100%',
        width: '100%'
      }}
    >
    </div>
  }
}

export {ReactComponent, scene, camera, globalGroup, container}
