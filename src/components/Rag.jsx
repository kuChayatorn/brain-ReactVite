import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { easing } from 'maath'

const Rag = (props) => {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
      state.events.update(); // Raycasts every frame rather than on pointer-move
      easing.damp3(
        state.camera.position,
        [-state.pointer.x * 2, state.camera.position.y + 1.5, state.camera.position.z],
        0.3,
        delta
      ); // Move camera
    // state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
};

export default Rag;
