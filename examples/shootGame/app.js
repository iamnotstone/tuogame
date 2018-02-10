import * as TuoGame from 'tuogame'
import {render} from 'react-dom'
import React from 'react'
import {ShootGame} from './shootGame'


render(<div
    style = {{
      width: '100vw',
      height: '100vh'
    }}
  >
    <ShootGame/>
  </div>, document.getElementById('root')
)
