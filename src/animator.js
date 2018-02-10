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

  load(){
    this.init()
    this.startT = new Date().getTime()
    animators.push(this)
  }

  unload(){
    let i = animators.indexOf(this)
    animators.splice(i,1)
  }
}
