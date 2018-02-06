import * as TuoGame from 'tuogame'

export class KeyBoardController extends TuoGame.Controller{
  constructor(){
    super()
    this.keyPress = this.keyPress.bind(this)
  }

  keyPress(event){
    let x = 0, y = 0
    switch(event.key){
      case 'w':
          y = 1
        break;
      case 's':
          y = -1
        break;
      case 'a':
          x = -1
        break;
      case 'd':
          x = 1
        break;
      default:
        break
    }
    let e = this.gameComponent.
      getParameter('matrix').elements
    let pos = new THREE.Vector3(e[12]+x, e[13]+y, e[14])
    this.gameComponent.updateParameter('matrix',
      this.gameComponent.getParameter('matrix').clone()
        .setPosition(pos))
  }

  mountController(){
    document.addEventListener('keypress', this.keyPress) 
  }

  umountController(){
    document.removeEventListener('keypress', this.keyPress)
  }
}
