/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 public/brain.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/brain.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Brain_Part_02.geometry} material={materials.BRAIN_TEXTURE_blinn2} position={[-0.793, 0.552, -0.096]} rotation={[1.584, 0, 0]} scale={3.586} />
      <mesh geometry={nodes.Brain_Part_04.geometry} material={materials.BRAIN_TEXTURE_blinn2} position={[0.046, 1.873, 0.748]} rotation={[1.584, 0, 0]} scale={3.586} />
      <mesh geometry={nodes.Brain_Part_05.geometry} material={materials.BRAIN_TEXTURE_blinn2} position={[-0.768, 1.283, 0.889]} rotation={[1.584, 0, 0]} scale={3.586} />
      <mesh geometry={nodes.Brain_Part_06.geometry} material={materials.BRAIN_TEXTURE_blinn2} position={[-1.492, 1.873, 0.748]} rotation={[1.584, 0, 0]} scale={3.586} />
    </group>
  )
}

useGLTF.preload('/brain.gltf')
