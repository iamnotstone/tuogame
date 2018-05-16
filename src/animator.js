import {animators} from './reactComponent'

export class Animator {
  constructor(obj){
    this.obj = obj
    this.startT = null
    this.isActive = true
    this.exec = this.exec.bind(this)
    this.willInactive = this.willInactive.bind(this)
  }

  exec(){
    throw('Animator: exec() not implemented')
  }

  init(){
    throw('Animator: init() not implemented')
  }

  willInactive(){

  }

  load(startT){
    this.init()
    this.startT = startT || new Date().getTime()
    animators.push(this)
  }

  unload(){
    this.isActive = false
  }
}
