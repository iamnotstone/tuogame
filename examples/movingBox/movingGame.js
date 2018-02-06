import * as TuoGame from 'tuogame'
import {MovingBox} from './box'
import {Ground} from './ground'
import {KeyBoardController} from './keyboardController'


export class MovingGame extends TuoGame.GameBase{
  initGame(){
    TuoGame.camera.position.set(100,-300,300)
    TuoGame.camera.lookAt(100,200,0)
    let box = new MovingBox()
    let grd = new Ground()
    let keyController = new KeyBoardController()
    TuoGame.addGameComponent(box)
    TuoGame.addGameComponent(grd)
    keyController.load(box)
  }
}

