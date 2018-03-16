import React from 'react'

var scene, camera, globalGroup, container, renderer, activeCamera;
var animators = []
var componentCount = 0
var width, height
var isReady = true
var readyCallback 
var initRenderer


export function setReadyCallback(cb){readyCallback = cb}
export function setIsReady(ready){isReady = ready}
export function setInitRenderer(cb){initRenderer = cb }


class ReactComponent extends React.Component{
  constructor(props){
    super(props)
    this.animate = this.animate.bind(this)
    this._onDocumentResize = this._onDocumentResize.bind(this)
  }

  initThree(){
    animators = []
    scene = new THREE.Scene()
		scene.background = new THREE.Color(0xb39c9c)
	  camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000)
		
		camera.position.set(0, 0, 100)
    camera.lookAt(0,0,0)
		this.light = new THREE.PointLight(0xf0f0f0,1)
		camera.add(this.light)
		scene.add(camera)
    activeCamera = camera
	  renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
    if(initRenderer) initRenderer(renderer)
    //renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap

		container.appendChild(renderer.domElement)

    globalGroup = new THREE.Group()
    scene.add(globalGroup)
    this.animate()
    
	}

  animate(){
    requestAnimationFrame(this.animate)
    this.execAnimators()
    renderer.render(scene, activeCamera)
    if(!isReady){
      if(readyCallback) readyCallback()
      isReady = true
    }
  }

  execAnimators(){
    let newAnimators = []
    animators.forEach((animator) => {
      if(animator.isActive){
        animator.exec()
        newAnimators.push(animator)
      }
    })
    animators = newAnimators
  }

  componentWillMount(){
    if(componentCount > 1)
      throw 'can not mount two reactgame.ReactComponent in the mean time'
    componentCount ++
  }

  componentWillUnmount(){
    animators = []
    if(componentCount > 0)
      componentCount --
  }

  componentDidMount(){
    width = container.offsetWidth
    height = container.offsetHeight
	  this.initThree()
    container.addEventListener('touchstart', this._onDocumentTouchStart, false);
    container.addEventListener('touchmove', this._onDocumentTouchMove, false);  
		window.addEventListener('resize', this._onDocumentResize, false)
		//this.setState({})
	}

  _onDocumentResize(){
    width = container.offsetWidth
    height = container.offsetHeight
    renderer.setSize(width, height)
    activeCamera.aspect = width / height
    activeCamera.updateProjectionMatrix()
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

function setActiveCamera(c){
  activeCamera = c
}

export {ReactComponent, scene, setActiveCamera, camera, globalGroup, container, renderer, animators, width, height, isReady, setInitRenderer}
