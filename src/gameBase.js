import React from 'react'
import {ReactComponent} from './reactComponent'

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
