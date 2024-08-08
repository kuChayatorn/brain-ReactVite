import {useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import ThreeMeshUI from 'three-mesh-ui'
import CourseNameConatiner from './CourseNameConatiner'


const PlayerInfoContainer = ({ courseName ="Hello"}) => {
    
    useFrame(() => {
        ThreeMeshUI.update()
    })

    return (
        <block
            args={[
                {
                    height: 0.4,
                    width: 2.9,
                    padding: 0.05,
                    backgroundOpacity: 1,
                    justifyContent: "center",
                    margin: 0,
                    offset: 0.05
                }
            ]}
        >
            <CourseNameConatiner courseName={courseName}/>
        </block>
    )
}

export default PlayerInfoContainer
