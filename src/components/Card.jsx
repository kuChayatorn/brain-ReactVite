import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { Image, Text } from '@react-three/drei';

const Card = ({ url, ...props }) => {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const pointerOver = (e) => (e.stopPropagation(), hover(true));
    const pointerOut = () => hover(false);
    const name = ["Cerebellum", 'Left Brain', 'Spinal Core', 'Right Brain']
    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
        easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
        easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
    });

    return (
        <group {...props}>
            <Image position={[-3, -1, 0.5]} ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} >
                <planeGeometry args={[2.5, 3]} />
                <mesh position={[0, 0, 0.03]}>
                    <planeGeometry args={[0.5, 0.5]} />
                    <meshStandardMaterial map={
                        new THREE.TextureLoader().load(
                            'playButton.svg'
                        )
                    } transparent />
                </mesh>
            </Image>
            <Text position={[0, -1, 0.5]} fontSize={0.6} color={'#FFD700'} maxWidth={1} lineHeight={1} textAlign={'center'} whiteSpace={'wrap'} >
                {name[props.cardIndex]}
            </Text>
            <Text position={[3, -1, 0.5]}fontSize={0.2} color={'gold'} maxWidth={2.5} lineHeight={1} textAlign={'center'} whiteSpace={'wrap'} >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente nobis nemo sunt iusto porro aperiam quisquam sint temporibus. Omnis corrupti ut neque illum error aliquid fugiat possimus officiis. Aliquid, velit.
            </Text>
        </group>

    );
}

export default Card;