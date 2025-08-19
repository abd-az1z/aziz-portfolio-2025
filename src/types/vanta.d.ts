import * as THREE from 'three';

export interface VantaWavesConfig {
  el: HTMLElement | string;
  THREE: typeof THREE;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  color?: number;
  shininess?: number;
  waveHeight?: number;
  waveSpeed?: number;
  zoom?: number;
  backgroundColor?: number;
  scale?: number;
  scaleMobile?: number;
  width?: number;
  height?: number;
}

export interface VantaWavesInstance {
  destroy: () => void;
  setOptions: (options: Partial<VantaWavesConfig>) => void;
}

declare const WAVES: (config: VantaWavesConfig) => VantaWavesInstance;

declare module 'vanta/dist/vanta.waves.min' {
  export default WAVES;
}
