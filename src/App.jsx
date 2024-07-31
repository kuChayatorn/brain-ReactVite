
import { Environment, OrbitControls, ScrollControls } from '@react-three/drei'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Carousel from './components/Carousel'
import Rag from './components/Rag'
import { div } from 'three/examples/jsm/nodes/Nodes.js'
import Model from './components/Model'
import Card from './components/Card'
import { useState } from 'react'
import { XR, createXRStore } from '@react-three/xr'
import * as THREE from 'three'



function App() {
  const [cardIndex, setCardIndex] = useState(0)
  const handleCardIndex = (index) => {
    setCardIndex(index)
  }
  const store = createXRStore()
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: '9999' }}>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
      <Canvas camera={{ position: [50, 30, 30], fov: 55 }}>
        <XR store={store}>
          <ambientLight />
          <directionalLight position={[0, 0, 5]} />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </XR>
      </Canvas>
    </div>

  )
}
export default App
