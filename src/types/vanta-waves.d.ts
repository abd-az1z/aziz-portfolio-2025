declare module 'vanta/dist/vanta.waves.min' {
  import * as THREE from 'three';

  interface VantaWavesConfig {
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

  interface VantaWavesInstance {
    destroy: () => void;
    setOptions: (options: Partial<VantaWavesConfig>) => void;
  }

  const WAVES: (config: VantaWavesConfig) => VantaWavesInstance;
  export default WAVES;
}
