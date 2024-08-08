import React from 'react'
import ThreeMeshUI from 'three-mesh-ui';
import Button from './Button';
import { useFrame } from '@react-three/fiber';
import PlayerInfoContainer from './playerInfoContainer';



const Controller = () => {

    return (
        <block args={[
            {
                width: 4.8, // Adjusted width
                height: 0.5, // Adjusted height
                padding: 0.1,
                justifyContent: 'start',
                borderRadius: 0.2,
                backgroundOpacity: 0.8,
                fontSize: 0.5,
                fontColor: 'white',
                contentDirection: 'row'
            }
        ]}
        >
            <Button onClick={() => console.log("clicking")} icon={"./playButton.svg"} w={0.3} h={0.3} />
            <Button onClick={() => console.log("clicking")} icon={"./playButton.svg"} w={0.3} h={0.3} />
            <Button onClick={() => console.log("clicking")} icon={"./playButton.svg"} w={0.3} h={0.3} />
            <Button onClick={() => console.log("clicking")} icon={"./playButton.svg"} w={0.3} h={0.3} />
            <PlayerInfoContainer courseName={"courseName"} />
        </block>
    )
}

export default Controller