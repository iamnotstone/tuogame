var controllers = []
export {controllers}
export class Controller{
  constructor(){
    this.gameComponent = null
  }

  mountController(){
    throw('Controller: mountController not implemeted')
  }

  umountController(){
    throw('Controller: umountController not implemented')
  }

  load(component){
    this.gameComponent = component
    this.mountController()
    controllers.push(this)
  }

  unload(){
    this.umountController()
    let i = controllers.indexOf(this)
    controllers.splice(i,1)
  }
}

