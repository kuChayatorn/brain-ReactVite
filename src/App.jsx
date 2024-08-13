
import { Environment, Float, OrbitControls, PerspectiveCamera, ScrollControls } from '@react-three/drei'
import './App.css'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import Model from './components/Brain'
import { useEffect, useRef, useState } from 'react'
import { XR, XROrigin, createXRStore } from '@react-three/xr'
import * as THREE from 'three'
import { XRDevice, metaQuest2 } from "iwer";
import Teather from './Pages/Teather'
import Rig from './components/Rig'
import Carousel from './components/Carousel'



const store = createXRStore({
  controller: {
    rayPointer: {
      rayModel: {
        color: "lime",
        opacity: 1,
        rayLength: 50,
      }
    }
  }
})

function App() {
  const [cardIndex, setCardIndex] = useState(0)
  const [page, setPage] = useState(0);
  const [configCamera,setConfigCamera] = useState({ position: [50, 30, 10], fov: 55 })
  const handlerPageIndex = (index) => {
    setPage(index);
  }

  const handlerCardIndex = (index) => {
    setCardIndex(index)
  }

  useEffect(() => {
    if(page==0){
      setConfigCamera({ position: [0, 0, 10], fov: 55 })
    }
    else if(page==1){
      setConfigCamera({ position: [0, 0, 10], fov: 75 })
    }
  }, [page])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: '9999' }}>
        <button className='card' onClick={() => store.enterVR()}>Enter VR</button>
        {/* <button className='card' onClick={() => store.enterAR()}>Enter AR</button> */}
      </div>
      <Canvas style={{ width: '100%', height: '100%' }} >
        <PerspectiveCamera makeDefault {...configCamera} />
        <XR store={store}>
          <XROrigin position={[0, 0, 10]} />
          {page == 0 && (
            <ScrollControls pages={3} infinite>
              <ambientLight intensity={1} />
              <Environment preset="dawn" background blur={0.5} />
              <Rig>
                <group>
                  <Model position={[0, 1, 0]} scale={0.8} handlerCardIndex={handlerCardIndex} />
                  <Carousel curCardIndex={cardIndex} handlerPageIndex={handlerPageIndex} />
                </group>
              </Rig>
            </ScrollControls>
          )}
          {page == 1 && (
            <>
              <OrbitControls enableZoom={false} />
              <Teather handlerPageIndex={handlerPageIndex} />
            </>
          )}
        </XR>
      </Canvas>
    </div>

  )
}
export default App
