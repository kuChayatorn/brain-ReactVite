
import { Environment, Float, OrbitControls, ScrollControls } from '@react-three/drei'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Model from './components/Brain'
import { useEffect, useState } from 'react'
import { XR, XROrigin, createXRStore } from '@react-three/xr'
import * as THREE from 'three'
import Carousel from './components/Carousel'
import Rig from './components/Rig'


function App() {
  const [cardIndex, setCardIndex] = useState(0)
  const handleCardIndex = (index) => {
    setCardIndex(index)
  }

  const store = createXRStore({
    hand: {
      rayPointer: {
        rayModel: {
          color: "red"
        }
      }
    }
  })

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: '9999' }}>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
      <Canvas camera={{ position: [50, 30, 10], fov: 55 }}>
        <XR store={store}>
          <XROrigin position={[0, 0, 10]} />
          {/* <OrbitControls/> */}
          <fog attach="fog" args={['#a79', 8.5, 1.2]} />
          <Environment preset="dawn" background blur={0.5} />
          <ScrollControls pages={3} infinite>
            <Rig>
              <Model position={[0, 1, 0]} scale={0.8} />
              {/* <Carousel curCardIndex={cardIndex} /> */}
            </Rig>
          </ScrollControls>
        </XR>
      </Canvas>
    </div>

  )
}
export default App
