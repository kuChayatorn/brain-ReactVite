import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { easing, geometry } from 'maath';
import { Environment, Image, Line, MeshPortalMaterial, Text } from '@react-three/drei';
import { Video } from './default/video';
import { Container, Root } from '@react-three/uikit';

const Card = ({ url, handlerPageIndex, ...props }) => {


    const ref = useRef();
    const [hovered, hover] = useState(false);
    const pointerOver = (e) => (e.stopPropagation(), document.body.style.cursor = 'pointer', hover(true));
    const pointerOut = () => (document.body.style.cursor = 'default', hover(false));
    const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025)
    const name = ["Cerebellum", 'Left Brain', 'Spinal Core', 'Right Brain']
    const description = [
        `
        •	Controls coordination and balance.\n
        •	Fine-tunes voluntary movements.\n
        •	Involved in motor learning.\n
        •	Regulates emotional responses.\n
    `, `
    	  •	Logical and analytical thinking.\n
        •	Language processing and speech.\n
        •	Manages math and science tasks.\n
        •	Controls the right body side.\n
    `, `
	•	Main body communication pathway.\n
	•	Coordinates reflex actions.\n
	•	Relays sensory information.\n
	•	Controls voluntary movements.\n
    `, `
	•	Creativity and visual-spatial skills.\n
	•	Interprets emotions and patterns.\n
	•	Processes holistic information.\n
	•	Controls the left body side.\n
    `
    ]
    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
        easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
        easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
    });

    return (
        <group {...props}>
            <group position={[0, 0, 0]}>
                <Image position={[-4.2, -1.5, 0.8]} ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} onClick={() => handlerPageIndex(1)}>
                    <planeGeometry args={[2.5, 3]} />
                    <mesh position={[0, 0, 0.03]}
                        onClick={() => handlerPageIndex(1)}>
                        <planeGeometry args={[1, 1]} />
                        <meshStandardMaterial color="white" style={{ border: ' solid black' }} map={
                            new THREE.TextureLoader().load(
                                'playButton.svg'
                            )
                        }
                            transparent
                        />
                    </mesh>
                </Image>

                <Line
                    points={[[-2.7, 0, 0.8], [-2.7, -3, 0.8]]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
                    color="grey"                   // Default
                    lineWidth={1}                   // In pixels (default)
                    segments                        // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
                    dashed={false}                  // Default
                />

                <group
                    position={[0, -1.6, 0]}>
                    <Root
                        flexDirection="row"
                        borderRadius={5}
                    >
                        <Container
                            transformTranslateZ={1}
                            width={1250}
                            height={380}
                            borderRadius={40}
                            backgroundColor="#f9f9f9"
                        >
                        </Container>
                    </Root>
                </group>
                {/* <Video src="https://cdnapisec.kaltura.com/p/2910381/sp/291038100/playManifest/entryId/1_89wjhrnp/format/url/protocol/https" controls width={500} /> */}

                <Text position={[-0.8, -1.5, 0.5]} fontWeight="normal" fontSize={0.6} color={'black'} maxWidth={4} lineHeight={1} textAlign={'center'} whiteSpace={'wrap'} >
                    {name[props.cardIndex]}
                </Text>

                <Text position={[3.2, -1.5, 0.5]} fontWeight="medium" fontSize={0.25} color={'black'} maxWidth={6} lineHeight={1} textAlign={'left'} whiteSpace={'wrap'} >
                    {description[props.cardIndex]}
                </Text>

                <mesh
                    position={[5.5, -0.1, 0.5]}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={() => (document.body.style.cursor = 'default')}
                >
                    <circleGeometry args={[0.2, 32]} /> {/* Changed from planeGeometry to circleGeometry */}
                    <meshStandardMaterial
                        color="grey"
                        style={{ border: ' solid white' }}
                        map={new THREE.TextureLoader().load('./icon/icon-unmute.png')}
                        transparent
                    />
                </mesh>
            </group>
        </group>

    );
}

export default Card;