
import { Environment, Float, OrbitControls, ScrollControls } from '@react-three/drei'
import './App.css'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import Model from './components/Brain'
import { useEffect, useState } from 'react'
import { XR, XROrigin, createXRStore } from '@react-three/xr'
import * as THREE from 'three'
import Carousel from './components/Carousel'
import Rig from './components/Rig'
import ThreeMeshUI from 'three-mesh-ui'
import Button from './components/Button'
import Controller from './components/Controller'
import Text from './components/Text'
import CourseNameContainer from './components/CourseNameConatiner'
// import Teather from './Pages/teather'
import { Root, Container } from "@react-three/uikit";

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

function App() {

  const [cardIndex, setCardIndex] = useState(0)

  const handleCardIndex = (index) => {
    setCardIndex(index)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: '9999' }}>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
      <Canvas camera={{ position: [50, 30, 10], fov: 55 }}>
        <XR store={store}>
          <XROrigin position={[0, 0, 10]} />
          <OrbitControls />
          {/* <fog attach="fog" args={['#a79', 8.5, 1.2]} /> */}
          <Environment preset="dawn" background blur={0.5} />
          <ScrollControls pages={3} infinite>
            {/* <Rig> */}
            {/* <Model position={[0, 1, 0]} scale={0.8} handleCardIndex={handleCardIndex} />
              <Carousel curCardIndex={cardIndex} /> */}
            {/* <Ray /> */}
            {/* <Teather/> */}
            <Root backgroundColor="red" sizeX={2} sizeY={1} flexDirection="row">
              <Container flexGrow={1} margin={2} backgroundColor="green"
                hover={{ position: [0, 0, 1] }}
                active={{ backgroundColor: 'green' }}
              />

              <Container flexGrow={1} margin={2} backgroundColor="blue" />
            </Root>
            {/* <Controller /> */}
            {/* <CourseNameContainer/> */}
            {/* <block
                args={[
                  {
                    width: 1,
                    height: 0.5,
                    fontSize: 0.1,
                    backgroundOpacity: 1,
                    fontFamily: './Roboto-msdf.json',
                    fontTexture: './Roboto-msdf.png'
                  }
                ]}>
                <Text onClick={() => console.log("clicking")} /> */}
            {/* </block> */}
            {/* </Rig> */}
            {/* <Button onClick={() => console.log("clicking")} /> */}
          </ScrollControls>
        </XR>
      </Canvas>
    </div>

  )
}
export default App
