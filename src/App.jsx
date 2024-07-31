
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
          {/* <OrbitControls></OrbitControls> */}
          {/* <fog attach="fog" args={['#a79', 8.5, 12]} /> */}
          <Environment preset="dawn" background blur={0.5} />
          <ScrollControls pages={4} infinite>
            <Model url="/brain.gltf" handleCardIndex={handleCardIndex} />
            <Card
              key={cardIndex}
              url={`/img${Math.floor(cardIndex % 4) + 1}_.jpg`}
              position={[-3, -1, 0]}
              rotation={[0, 0, 0]}
              cardIndex={cardIndex}
            />
          </ScrollControls>
        </XR>
      </Canvas>
    </div>

  )
}
export default App
