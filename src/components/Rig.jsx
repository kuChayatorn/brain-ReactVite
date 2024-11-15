import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { easing } from 'maath'
import * as THREE from 'three'


const Rig = (props) => {
    const ref = useRef()
    const scroll = useScroll()
  useFrame((state, delta) => {
    if (!state.gl.xr.isPresenting) { 
      state.events.update() // Raycasts every frame rather than on pointer-move
      easing.damp3(
          state.camera.position,
          [-state.pointer.x * 0.5, state.pointer.y*0.1, state.camera.position.z],
          0.3,
          delta
        ); // Move camera
      let po = new THREE.Vector3();
      po.x = 0 
      po.y = 0
      po.z = 0 
      state.camera.lookAt(po);
    }
      })
  return <group ref={ref} {...props}/>
}

export default Rig