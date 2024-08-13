import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { Image, Text } from '@react-three/drei';

const Card = ({ url, handlerPageIndex, ...props }) => {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const pointerOver = (e) => (e.stopPropagation(), hover(true));
    const pointerOut = () => hover(false);
    const name = ["Cerebellum", 'Left Brain', 'Spinal Core', 'Right Brain']
    const description = [
        `The cerebellum is a region at the back of the brain that controls coordination and balance. It plays a crucial role in motor control and can affect cognitive functions and emotional regulation.`,
        'The left hemisphere of the brain is typically associated with logical thinking, analytical skills, and language processing. It is often linked to tasks involving mathematics, science, and reasoning',
        'The spinal cord is a long, tubular structure that runs from the base of the brain down the vertebral column. It transmits signals between the brain and the rest of the body, coordinating movement and reflexes',
        'Right Brain']
    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
        easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
        easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
    });

    return (
        <group {...props}>
            <Image position={[-3, -1, 0.5]} ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} onClick={()=>handlerPageIndex(1)}>
                <planeGeometry args={[2.5, 3]} />
                <mesh position={[0, 0, 0.03]}
                    onClick={()=>handlerPageIndex(1)}>
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
            <Text position={[3, -1, 0.5]} fontSize={0.2} color={'gold'} maxWidth={2.5} lineHeight={1} textAlign={'center'} whiteSpace={'wrap'} >
                {description[props.cardIndex]}
            </Text>
        </group>

    );
}

export default Card;