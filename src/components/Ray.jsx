import React from 'react'
import { useXR } from "@react-three/xr"
import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'

function Ray() {
    const { controllers } = useXR()
    const rayRef = useRef()
  
    useFrame(() => {
      if (controllers&&controllers.length > 0) {
        const controller = controllers[0]
        const raycaster = controller.interactionRays[0]
        if (raycaster && rayRef.current) {
          const rayLength = 50
          const points = [raycaster.ray.origin, raycaster.ray.direction.clone().multiplyScalar(rayLength)]
          rayRef.current.geometry.setFromPoints(points)
        }
      }
    })
  
    return (
      <line ref={rayRef}>
        <bufferGeometry />
        <lineBasicMaterial color="lime" />
      </line>
    )
}

export default Ray