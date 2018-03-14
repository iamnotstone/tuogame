import React from 'react'
import {ReactComponent,scene, setIsReady} from './reactComponent'
import {controllers} from './controller'
var eventDispatcher
export {eventDispatcher}
function clearThree(obj){
  while(obj.children.length > 0){ 
    clearThree(obj.children[0])
    obj.remove(obj.children[0]);
  }
  if(obj.geometry) obj.geometry.dispose()
  if(obj.material) obj.material.dispose()
  if(obj.texture) obj.texture.dispose()
}   

class GameBase extends React.Component{

  constructor(props){
    super(props)
    this.animators = []
  }

  initGame(){
    throw('initGame not implemted')
  }

  prevCondition(){
    return Promise.resolve()
  }

  componentDidMount(){
    this.prevCondition()
      .then(() => (this.initGame()))
    eventDispatcher = new THREE.EventDispatcher()
    setIsReady(false)
  }

  componentWillUnmount(){
    clearThree(scene)
    controllers.forEach(c => c.unload())
  }

  render(){
    return <div
      style = {{
        width: '100%',
        height: '100%'
      }}
    >
      <ReactComponent />
    </div>
  }
}

export {GameBase}
