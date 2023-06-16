import React from "react";
import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

export const AudioVisualizer: React.FC<{ audioData: Vector3 }> = (props) => {
  return (
      <Box scale={props.audioData}>
        <meshBasicMaterial color="rgb(48, 75, 129)" />
      </Box>
  );
};
