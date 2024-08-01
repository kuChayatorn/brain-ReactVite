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
  });
  // console.log(gltf)
  return <primitive object={gltf.scene} />;
}

export default Model
