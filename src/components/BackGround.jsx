import { Environment, Sphere } from '@react-three/drei';
import { Gradient, LayerMaterial } from 'lamina';
import React, { useMemo } from 'react';
import * as THREE from 'three';

const gradientColors = {
    colorA: '#fb6f92',
    colorB: '#ffd1dc',
};
const gradientAxes = 'y';
const gradientStart = 0;
const gradientEnd = -0.7;

const sphereScale = 100;
const sphereRotationY = Math.PI / 2;

const Background = () => {
    const sphereMaterial = useMemo(() => (
        <LayerMaterial
            lighting="physical"
            transmission={1}
            side={THREE.BackSide}
        >
            <Gradient 
                colorA={gradientColors.colorA} 
                colorB={gradientColors.colorB} 
                axes={gradientAxes} 
                start={gradientStart} 
                end={gradientEnd}
            />
        </LayerMaterial>
    ), []);

    return (
        <>
            <Environment preset="sunset" />
            <Sphere scale={sphereScale} rotation-y={sphereRotationY} args={[1, 32, 32]}>
                {sphereMaterial}
            </Sphere>
        </>
    );
};

export default Background;