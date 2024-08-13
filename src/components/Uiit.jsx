import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Plane, Text, Html } from '@react-three/drei';
import { Button, Slider } from 'uikit';

const Uiit = ({ courseName, onBack, onPlayPause, onStepBack, onStepForward, onMute, onSpeedChange }) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const [playIcon, setPlayIcon] = useState('/resources/icon-pause.png');
  const [muteIcon, setMuteIcon] = useState('/resources/icon-sound.png');
  const [speed, setSpeed] = useState('1.0');

  return (
    <group position={[0, -0.7, -2]} rotation={[-Math.PI / 6, 0, 0]}>
      <Box args={[4.8, 0.5, 0.1]} position={[0, 0, 0]} material-opacity={0.8}>
        <Html position={[-2.4, 0, 0.1]}>
          <Button onClick={onBack}>
            <img src="/resources/back_arrow.png" alt="Back" />
          </Button>
        </Html>

        <Html position={[2.4, 0, 0.1]} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button onClick={onPlayPause}>
            <img src={playIcon} alt="Play/Pause" />
          </Button>
          <Button onClick={onStepBack}>
            <img src="/resources/icon-backward.png" alt="Step Back" />
          </Button>
          <Button onClick={onStepForward}>
            <img src="/resources/icon-forward.png" alt="Step Forward" />
          </Button>
          <Button onClick={onMute}>
            <img src={muteIcon} alt="Mute" />
          </Button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button onClick={() => onSpeedChange(true)}>
              <img src="/resources/icon-up.png" alt="Speed Up" />
            </Button>
            <Text>{speed}</Text>
            <Button onClick={() => onSpeedChange(false)}>
              <img src="/resources/icon-down.png" alt="Speed Down" />
            </Button>
          </div>
        </Html>
      </Box>

      <Html position={[0, -0.3, 0.1]} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>{courseName}</Text>
        <Slider value={videoProgress} onChange={setVideoProgress} />
      </Html>
    </group>
  );
};

export default Uiit;
