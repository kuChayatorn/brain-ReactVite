import React, { useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Controller from '../components/Controller';
import dashjs from 'dashjs';
import { useXR, XRLayer, XROrigin } from '@react-three/xr';
import { Text } from '@react-three/drei';

const Teather = ({ handlerPageIndex, handlerDisableOrbitControls, index }) => {
    const [isPresenting, setIsPresenting] = useState(false)
    const [videoTexture, setVideoTexture] = useState(null)
    const [isLoading, setIsLoading] = useState(true); // Track loading status

    const videoSource = [
        "https://cdnapisec.kaltura.com/p/2910381/sp/291038100/playManifest/entryId/1_s8qkye3r/format/url/protocol/https",
        "https://cdnapisec.kaltura.com/p/2910381/sp/291038100/playManifest/entryId/1_s9ea3q4p/format/url/protocol/https",
        "https://cdnapisec.kaltura.com/p/2910381/sp/291038100/playManifest/entryId/1_86e5u5ue/format/url/protocol/https",
        "https://cdnapisec.kaltura.com/p/2910381/sp/291038100/playManifest/entryId/1_y07emu2c/format/url/protocol/https"
    ]
    const videoCourse = useMemo(() => {
        const video = document.createElement("video");
        video.id = "asset-video-1";
        video.className = "asset-video";
        video.crossOrigin = "anonymous";
        video.src = videoSource[index]
        video.controls = false;
        video.muted = true;
        video.autoplay = false;
        video.preload = "auto";
        video.style.display = "none";
        document.body.appendChild(video);
        return video;
    }, []);



    useEffect(() => {
        // const player = dashjs.MediaPlayer().create();
        // player.initialize(
        //     videoCourse,
        //     "https://player.vimeo.com/external/986300466.mpd?s=67c4770b8102d7ff31dc86c428263dcde33387a7&logging=false",
        //     false
        // );

        const handleVideoReady = () => {
            setIsLoading(false); // Video is ready
        };
        videoCourse.addEventListener('canplay', handleVideoReady);
        videoCourse.muted = false;
        videoCourse.setAttribute('playsinline', 'true'); // Required for mobile and VR playback
        // Cleanup on unmount
        return () => {
            // player.reset();
            videoCourse.removeEventListener('canplay', handleVideoReady);
            document.body.removeChild(videoCourse); // Cleanup on unmount
        };
    }, [videoCourse]);


    useEffect(() => {
        if (isPresenting && videoTexture) {
            videoTexture.dispose();
            setVideoTexture(null);
        } else {
            const texture = new THREE.VideoTexture(videoCourse);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBAFormat;
            texture.encoding = THREE.sRGBEncoding;
            setVideoTexture(texture);
        }
    }, [isPresenting, videoCourse]);

    useFrame(() => {
        if (videoTexture && !isPresenting) {
            videoTexture.needsUpdate = true;
        }
    });

    const { mode } = useXR((state) => state)
    useEffect(() => {
        setIsPresenting(mode === 'immersive-vr');
    }, [mode])

    const camera = useThree((state) => state.camera);
    useEffect(() => {
        camera.near = 0.01; // Set a very small near clipping plane
        camera.updateProjectionMatrix();
    }, [camera]);

    useEffect(() => {

        const handleXRSessionStart = () => {
            videoCourse.play();
        };

        window.addEventListener('xrSessionStart', handleXRSessionStart);
        return () => {
            window.removeEventListener('xrSessionStart', handleXRSessionStart);
        };
    }, [videoCourse]);

    return (
        <>
            {(isPresenting ? (
                <XRLayer
                    src={videoCourse}
                    shape="quad"
                    position={[0, 1.5, -5]} // Consistent with the content's intended position
                    scale={[16, 9, 1]} // Ensure scale is appropriate
                />) : (
                <mesh
                    position={[0, 1.5, -5]} // Matches the XRLayer position for smooth transition
                    scale={[16, 9, 1]}
                >
                    <planeGeometry />
                    <meshBasicMaterial map={videoTexture} />
                </mesh>
            ))}
            <Controller
                videoElement={videoCourse}
                handlerPageIndex={handlerPageIndex}
                handlerDisableOrbitControls={handlerDisableOrbitControls}
            />
        </>
    );
};

export default Teather;
