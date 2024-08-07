import React, { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useVideoTexture, VideoTexture } from '@react-three/drei';

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
        videoCourse.play();
    }, [videoCourse]);

    const videoTexture = useMemo(() => {
        const texture = useVideoTexture(videoCourse);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.generateMipmaps = false;
        texture.encoding = THREE.sRGBEncoding;
        texture.needsUpdate = true;
        texture.anisotropy = 16;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(-1, 1);
        return texture;
    }, [videoCourse]);

    const videoMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            map: videoTexture,
            color: 0xffffff,
            transparent: false,
            opacity: 1,
            blending: THREE.NormalBlending,
            depthWrite: true,
            depthTest: true,
            colorWrite: true,
            side: THREE.BackSide,
            toneMapped: false, // Ensure tone mapping is not applied
            lights: false, // Disable lights to reduce highlights
            shadowSide: THREE.FrontSide, // Disable shadows to reduce shadows
        });
    }, [videoTexture]);

    const halfSphereGeometry = useMemo(() => new THREE.SphereGeometry(64, 64, 64, Math.PI / 2, Math.PI * 2), []);
    return (
        <mesh
            geometry={halfSphereGeometry}
            material={videoMaterial}
            position={[0, 0, 0]}
            rotation={[0, Math.PI / 2, Math.PI]} // Rotate by PI to flip the mesh on Y-axis
        />
    );
};

export default Teather;
