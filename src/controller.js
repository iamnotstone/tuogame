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
  }

  unload(){
    this.umountController()
  }
}
