import React, { useRef, useState } from 'react'
import { easing } from 'maath'
import Card from './Card'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Carousel = ({ curCardIndex, handlerPageIndex, radius = 20, count = 4, origin = [0, 0, 20] }) => {
    const ref = useRef()

    const rotatetionAtIndex = [Math.PI, Math.PI * 0.5, 0, Math.PI * 1.5]
    const [rotationY, setRotationY] = useState(0);
    useFrame((state, delta) => {
        ref.current.position.set(origin[0], origin[1], origin[2])
        easing.dampE(ref.current.rotation, [0, rotatetionAtIndex[curCardIndex], 0], 0.1, delta)
        setRotationY(rotatetionAtIndex[curCardIndex])
    })
    return <group ref={ref}>
        {Array.from({ length: count }, (_, i) => (
            <Card
                key={i}
                url={`/img${Math.floor(i % 4) + 1}_.jpg`}
                position={[
                    Math.sin((i / count) * Math.PI * 2) * radius,
                    0,
                    Math.cos((i / count) * Math.PI * 2) * radius
                ]}
                rotation={[0, -rotationY, 0]}
                cardIndex={i}
                handlerPageIndex={handlerPageIndex}
            />
        ))}
    </group>

}

export default Carousel