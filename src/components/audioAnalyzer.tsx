import React, { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { createAudio } from "../lib/audio";
import { AudioVisualizer } from "./audioVisualizer";

export const AudioAnalyzer: React.FC = () => {
  const ref = useRef<Group>(null);
  const audioAnalyser = useRef<AnalyserNode | null>(null);
  const audioSource = useRef<AudioBufferSourceNode | null>(null);
  const [audioData, setAudioData] = useState<number>(0);

  /**
   * 音声データを読み込んで再生する処理
   */
  async function startAudio() {
    const { audioSource: source, audioAnalyser: analyser } =
      await createAudio();
    audioSource.current = source;
    audioAnalyser.current = analyser;

    // 再生
    audioSource.current.start();
  }

  /**
   * 読み込んだ音声データを加工する処理
   */
  function updateAudioData() {
    if (!audioAnalyser.current) return;

    // 音声データから周波数の配列を取得する
    const audioData = new Uint8Array(audioAnalyser.current.frequencyBinCount);
    audioAnalyser.current.getByteFrequencyData(audioData);

    // 加工
    const formattedData = audioData.reduce((x, y) => Math.max(x, y)) / 255;

    setAudioData(formattedData + 0.5);
    console.log(audioData);
  }

  useEffect(() => {
    if (!audioSource.current) startAudio();
  });

  useFrame(() => {
    updateAudioData();
  });

  return (
    <group ref={ref}>
      <OrbitControls />
      <AudioVisualizer audioData={audioData} />
    </group>
  );
};
