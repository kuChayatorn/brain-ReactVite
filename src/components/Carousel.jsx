import React from 'react'
import Card from './Card'

const Carousel = ({ radius = 20, count = 8 }) => {
    return Array.from({ length: count }, (_, i) => (
        <Card
            key={i}
            url={`/img${Math.floor(i % 10) + 1}_.jpg`}
            position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
            rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        />
    ))
}

export default Carousel