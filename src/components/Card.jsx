import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { easing, geometry } from 'maath';
import { Environment, Image, Line, MeshPortalMaterial } from '@react-three/drei';
import { Video } from './default/video';
import { Container, FontFamilyProvider, Root, Text } from '@react-three/uikit';

const Card = ({ url, handlerPageIndex, ...props }) => {


    const ref = useRef();
    const [hovered, hover] = useState(false);
    const pointerOver = (e) => (e.stopPropagation(), document.body.style.cursor = 'pointer', hover(true));
    const pointerOut = () => (document.body.style.cursor = 'default', hover(false));
    const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025)
    const name = ["Cerebellum", 'Left Hemisphere', 'Spinal Cord', 'Right Hemisphere']
    const descriptionFunction = [
        ['-Regulates balance', '-Precise movements', '-Muscle coordination'],
        ['-Controls logic', '-Language', '-Calculation', '-Analysis'],
        ['-Transmits signals between the brain and body', '-Controls reflexes'],
        ['-Manages creativity', '-Imagination', '-Emotions', '-Holistic perception']
    ];
    const descriptionEffect = [
        ['-Alcohol and sedatives disrupt cerebellar functions', '-Causing unsteady walking', '-Loss of balance', '-Reduced movement accuracy'],
        ['-Substances like alcohol or cannabis may impair reasoning', '-Logical thinking', '-Causing errors in decision-making', '-Communication.'],
        [ '-Diminishing pain perception', '-Increasing the risk of losing muscle control', '-Central nervous system functionality','-Opioids may suppress spinal signal transmission'],
        ['-Drugs like LSD or hallucinogens may trigger hallucinations', '-Distort perception', '-Reduce emotional control', '-Focus']
    ];
    const description = [
        `
        -ควบคุมการประสานงานและสมดุล\n
        • ปรับปรุงการเคลื่อนไหวโดยสมัครใจ\n
        • มีส่วนร่วมในการเรียนรู้การเคลื่อนไหว\n
        • ควบคุมการตอบสนองทางอารมณ์\n
    `, `
        • การคิดอย่างมีเหตุผลและการวิเคราะห์\n
        • การประมวลผลภาษาและการพูด\n
        • จัดการงานคณิตศาสตร์และวิทยาศาสตร์\n
        • ควบคุมด้านขวาของร่างกาย\n
    `, `
        • เส้นทางการสื่อสารหลักของร่างกาย\n
        • ประสานงานการกระทำสะท้อนกลับ\n
        • ถ่ายทอดข้อมูลทางประสาทสัมผัส\n
        • ควบคุมการเคลื่อนไหวโดยสมัครใจ\n
    `, `
        • ทักษะการสร้างสรรค์และการมองภาพ\n
        • ตีความอารมณ์และรูปแบบ\n
        • ประมวลผลข้อมูลโดยรวม\n
        • ควบคุมด้านซ้ายของร่างกาย\n
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
                {/* <Image position={[-4.2, -1.5, 0.8]} ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} onClick={() => handlerPageIndex(1)}> */}
                <Image position={[6.5, 2.2, 0.8]} ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} onClick={() => handlerPageIndex(1)}>
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

                {/* <Line
                    points={[[-2.7, 0, 0.8], [-2.7, -3, 0.8]]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
                    color="grey"                   // Default
                    lineWidth={1}                   // In pixels (default)
                    segments                        // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
                    dashed={false}                  // Default
                /> */}

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
                            flexDirection={'column'}
                            padding={25}
                        >
                            <Text width={'100%'} textAlign={'center'} fontSize={64} fontWeight={'semi-bold'}>{name[props.cardIndex]} </Text>
                            <Container flexDirection={'row'} padding={20}>
                                <Container flexDirection={'column'} flexBasis={'50%'} gap={10}>
                                    <Text fontSize={32} fontWeight={'medium'}>Functions:</Text>
                                    {descriptionFunction[props.cardIndex].map((item, index) =>
                                        <Text fontSize={24} marginLeft={10} key={item}>{item}</Text>
                                    )}
                                </Container>
                                <Container flexDirection={'column'} flexBasis={'50%'} gap={10}>
                                    <Text fontSize={32} fontWeight={'medium'}>Effects of Drugs:</Text>
                                    {descriptionEffect[props.cardIndex].map((item, index) =>
                                        <Text fontSize={24} marginLeft={10} key={index}>{item}</Text>
                                    )}
                                </Container>
                            </Container>
                            {/* <Text>{descriotionFunction[props.cardIndex]} </Text> */}

                            {/* <Text>{descriptionEffect[props.cardIndex]} </Text> */}
                        </Container>
                    </Root>
                </group>
                {/* <Video src="https://cdnapisec.kaltura.com/p/2910381/sp/291038100/playManifest/entryId/1_89wjhrnp/format/url/protocol/https" controls width={500} /> */}

                {/* <Text position={[-0.8, -1.5, 0.5]} fontWeight="normal" fontSize={0.6} color={'black'} maxWidth={4} lineHeight={1} textAlign={'center'} whiteSpace={'wrap'} > */}

                {/* </Text> */}

                {/* <Text position={[3.2, -1.5, 0.5]} fontWeight="medium" fontSize={0.25} color={'black'} maxWidth={6} lineHeight={1} textAlign={'left'} whiteSpace={'wrap'} >
                    {description[props.cardIndex]}
                </Text> */}

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