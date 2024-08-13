import React, { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Controller from '../components/Controller';
import { sRGBEncoding } from '@react-three/drei/helpers/deprecated';

const Teather = ({handlerPageIndex}) => {
    const videoCourse = useMemo(() => {
        const video = document.createElement("video");
        video.id = "asset-video-1";
        video.className = "asset-video";
        video.crossOrigin = "anonymous";
        video.controls = false;
        video.muted = true;
        video.autoplay = false;
        video.preload = "auto";
        video.style.display = "none";
        document.body.appendChild(video);
        return video;
    }, []);

    useEffect(() => {
        const player = dashjs.MediaPlayer().create();
        player.initialize(videoCourse, "https://cdnapisec.kaltura.com/p/2910381/sp/291038100/playManifest/entryId/1_89wjhrnp/format/mpegdash/protocol/https", false);
        videoCourse.muted = false;
        // videoCourse.play();

        // Cleanup on unmount
        return () => {
            player.reset();
            document.body.removeChild(videoCourse);
        };
    }, [videoCourse]);

    const CustomVideoMaterial = (videoElement) => {
        const videoTexture = useMemo(() => {
          const texture = new THREE.VideoTexture(videoElement);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBFormat;
          texture.encoding = sRGBEncoding;
          return texture;
        }, [videoElement]);
      
        const customShaderMaterial = useMemo(() => {
          return new THREE.ShaderMaterial({
            uniforms: {
              uTexture: { value: videoTexture },
              uBrightness: { value: 1.0 },
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform sampler2D uTexture;
              uniform float uBrightness;
              varying vec2 vUv;
              void main() {
                vec4 color = texture2D(uTexture, vUv);
                color.rgb *= uBrightness;
                gl_FragColor = color;
              }
            `,
            side: THREE.BackSide,
            toneMapped: true,
          });
        }, [videoTexture]);
      
        return customShaderMaterial;
      };
      const customMaterial = CustomVideoMaterial(videoCourse);
    const halfSphereGeometry = useMemo(() => {
        return new THREE.SphereGeometry(64, 64, 64, Math.PI / 2, Math.PI * 2);
    }, []);

    return (
        <group>
            <mesh
                geometry={halfSphereGeometry}
                material={customMaterial}
                position={[0, 0, 0]}
                scale={[-1, 1, 1]}  
                rotation={[0, Math.PI / 2, 0]} 
            />
            <Controller videoElement={videoCourse} handlerPageIndex={handlerPageIndex}/> 
        </group>
    );
};

export default Teather;
