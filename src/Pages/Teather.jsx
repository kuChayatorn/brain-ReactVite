import React, { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Controller from '../components/Controller';

const Teather = () => {
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

    const videoTexture = useMemo(() => {
        const texture = new THREE.VideoTexture(videoCourse);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.generateMipmaps = false;
        texture.encoding = THREE.sRGBEncoding;
        return texture;
    }, [videoCourse]);
    

    const videoMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            map: videoTexture,
            side: THREE.BackSide, // Ensures the texture is applied to the inside of the sphere
        });
    }, [videoTexture]);

    const halfSphereGeometry = useMemo(() => {
        return new THREE.SphereGeometry(64, 64, 64, Math.PI / 2, Math.PI * 2);
    }, []);

    return (
        <group>
            <mesh
                geometry={halfSphereGeometry}
                material={videoMaterial}
                position={[0, 0, 0]}
                scale={[-1, 1, 1]}  // This will flip the mesh horizontally
                rotation={[0, Math.PI / 2, 0]} // Rotate to correctly orient the video
            />
            <Controller videoElement={videoCourse}/> 
        </group>
    );
};

export default Teather;
