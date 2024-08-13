
import { Environment, Float, OrbitControls, ScrollControls } from '@react-three/drei'
import './App.css'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import Model from './components/Brain'
import { useEffect, useState } from 'react'
import { XR, XROrigin, createXRStore } from '@react-three/xr'
import * as THREE from 'three'
import Carousel from './components/Carousel'
import Rig from './components/Rig'
import Ray from './components/Ray'
import { XRDevice, metaQuest2 } from "iwer";
import ThreeMeshUI from 'three-mesh-ui'
import Button from './components/Button'
import Controller from './components/Controller'
import CourseNameContainer from './components/CourseNameConatiner'
// import Teather from './Pages/teather'
import { Root, Container, Image, Text, } from "@react-three/uikit";
import { Slider } from './components/apfel/slider'
import Teather from './Pages/Teather'

extend(ThreeMeshUI)



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
<<<<<<< HEAD
=======

>>>>>>> f63d5a6ed4f4d2f30540883f6da5002881b4b718

function App() {

  const [cardIndex, setCardIndex] = useState(0)

  const handleCardIndex = (index) => {
    setCardIndex(index)
  }
  const xrDevice = new XRDevice(metaQuest2);
  // xrDevice.enableHandTracking(); // This is an example method, replace with the correct one if different
  xrDevice.installRuntime();

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: '9999' }}>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
      <Canvas camera={{ position: [50, 30, 10], fov: 55 }}>
        <XR store={store}>
          <XROrigin position={[0, 0, 10]} />
          {/* <OrbitControls /> */}
          {/* <fog attach="fog" args={['#a79', 8.5, 1.2]} /> */}
          <Environment preset="dawn" background blur={0.5} />
          <ScrollControls pages={3} infinite>
            <Rig>
            {/* <Model position={[0, 1, 0]} scale={0.8} handleCardIndex={handleCardIndex} /> */}
              {/* <Carousel curCardIndex={cardIndex} /> */}
            <Teather/>
            {/* <Controller /> */}
            </Rig>
            {/* <Button onClick={() => console.log("clicking")} /> */}
          </ScrollControls>
        </XR>
      </Canvas>
    </div>

  )
}
export default App
