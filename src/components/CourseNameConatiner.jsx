import { extend, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeMeshUI from 'three-mesh-ui';

extend(ThreeMeshUI)

const CourseNameContainer = () => {

    return (
        <block
            args={[
                {
                    width: 5,
                    height: 5,
                    backgroundOpacity: 1,
                    fontSize: 0.1,
                    fontFamily: './Roboto-msdf.json',
                    fontTexture: './Roboto-msdf.png'
                }
            ]}>
            <text content={'Hello '} />
        </block>
    )
};

export default CourseNameContainer;
