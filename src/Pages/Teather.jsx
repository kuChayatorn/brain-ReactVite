import React, { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Controller from '../components/Controller';
import { sRGBEncoding } from '@react-three/drei/helpers/deprecated';

const Teather = ({ handlerPageIndex, handlerDisableOrbitControls }) => {
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
        player.initialize(videoCourse, "https://player.vimeo.com/external/986300466.mpd?s=67c4770b8102d7ff31dc86c428263dcde33387a7&logging=false", false);
        videoCourse.muted = false;
        // videoCourse.play();

        // Cleanup on unmount
        return () => {
            player.reset();
            document.body.removeChild(videoCourse);
        };
    }, [videoCourse]);

    let videoTexture;
    
    useFrame(() => {
        if (videoTexture) {
            videoTexture.needsUpdate = true;
        }
    });
    const camera = useThree((state) => state.camera);
    useEffect(() => {
        camera.near = 0.01; // Set a very small near clipping plane
        camera.updateProjectionMatrix();
    }, [camera]);

    const CustomVideoMaterial = (videoElement) => {
        videoTexture = useMemo(() => {
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
                side: THREE.DoubleSide, // Changed from BackSide to DoubleSide
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
                position={[0, 0, -1]}
                scale={[-1, 1, 1]}
                rotation={[0, Math.PI / 2, 0]}
            />
            <Controller
                videoElement={videoCourse}
                handlerPageIndex={handlerPageIndex}
                handlerDisableOrbitControls={handlerDisableOrbitControls}
            />
        </group>
    );
};

export default Teather;
