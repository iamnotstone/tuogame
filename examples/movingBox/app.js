import * as TuoGame from 'tuogame'
import {render} from 'react-dom'
import React from 'react'

const TuoGameReact = TuoGame.ReactComponent

render(<div
    style = {{
      width: '100vw',
      height: '100vh'
    }}
  >
    <TuoGameReact/>
  </div>, document.getElementById('root')
)
