import React, { useEffect, useState } from 'react'
import { useScroll } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useFrame, useLoader } from '@react-three/fiber';
import { easing } from 'maath'
import * as THREE from 'three'

const Model = ({ url, handleCardIndex }) => {
  const gltf = useLoader(GLTFLoader, url);
  const scroll = useScroll();
  const masterMaterial = gltf.scene.children;
  const [scrolloff, setScrolloff] = useState(0);
  const [currentHilightChildIndex, setCurrentHilightChildIndex] = useState(null);

  useEffect(() => {
    gltf.scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        const material = child.material.clone();
        masterMaterial.material = material.clone();
      }
    })
  }, [])

  useEffect(() => {
    handleCardIndex(currentHilightChildIndex);
    for (let i = 0; i < gltf.scene.children.length; i++) {
      const child = gltf.scene.children[i];
      if (i == currentHilightChildIndex) {
        if (child && child instanceof THREE.Mesh) {
          const material = child.material.clone();
          material.color.set(0xffa500);
          child.material = material;
        }
      }
      else {
        if (child && child instanceof THREE.Mesh) {
          child.material = masterMaterial.material;
        }
      }
    }
  }, [currentHilightChildIndex])

  useEffect(() => {
    const childIndex = Math.floor(scrolloff * 4);
    // console.log(childIndex)
    if (childIndex !== currentHilightChildIndex) {
      setCurrentHilightChildIndex(childIndex);
    }
  }, [scrolloff]);

  useFrame((state, delta) => {
    setScrolloff(scroll.offset >= 0 ? scroll.offset % 1 : (1 + scroll.offset) % 1)
    // console.log(scrolloff)
    gltf.scene.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, state.camera.position.z],
      0.3,
      delta
    ); // Move camera
    let po = gltf.scene.position
    po.x = 0 - state.camera.position.x
    po.y = 0
    po.z = 10 - state.camera.position.z
    state.camera.lookAt(po); // Look at brain position
  });
  // console.log(gltf)
  return <primitive object={gltf.scene} />;
}

export default Model
