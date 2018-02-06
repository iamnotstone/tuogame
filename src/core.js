import {globalGroup} from './reactComponent'

export function addGameComponent(object){
  globalGroup.add(object.threeObj)
}

export function removeGameComponent(obj){
  globalGroup.remove(obj.threeObj)
  if(obj.threeObj.geometry) obj.threeObj.geometry.dispose()
  if(obj.threeObj.material) obj.threeObj.material.dispose()
  if(obj.threeObj.texture) obj.texture.dispose()
}

