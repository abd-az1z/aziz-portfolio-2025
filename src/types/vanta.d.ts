declare module 'vanta/dist/vanta.rings.min' {
  import * as THREE from 'three';
  
  interface VantaRingsSettings {
    el: HTMLElement | string;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number | string;
    backgroundColor?: number | string;
    backgroundAlpha?: number;
    color2?: number | string;
    size?: number;
    quantity?: number;
  }

  interface VantaEffect {
    destroy(): void;
    resize(): void;
    setOptions(options: Partial<VantaRingsSettings>): void;
  }

  function RINGS(settings: VantaRingsSettings): VantaEffect;
  
  export = RINGS;
}

declare module 'vanta/dist/vanta.net.min' {
  import * as THREE from 'three';
  
  interface VantaNetSettings {
    el: HTMLElement | string;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
  }

  interface VantaEffect {
    destroy(): void;
    setOptions(settings: Partial<VantaNetSettings>): void;
    resize(): void;
  }

  function NET(settings: VantaNetSettings): VantaEffect;
  
  export = NET;
}
