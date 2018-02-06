import * as TuoGame from 'tuogame'
import {render} from 'react-dom'
import React from 'react'
import {MovingGame} from './movingGame'


render(<div
    style = {{
      width: '100vw',
      height: '100vh'
    }}
  >
    <MovingGame/>
  </div>, document.getElementById('root')
)
