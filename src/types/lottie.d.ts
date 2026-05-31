declare module "three/examples/jsm/libs/lottie_canvas.module.js" {
  const lottie: {
    loadAnimation: (options: {
      container: HTMLElement;
      renderer?: "svg" | "canvas" | "html";
      loop?: boolean;
      autoplay?: boolean;
      path?: string;
      animationData?: unknown;
      rendererSettings?: Record<string, unknown>;
    }) => {
      destroy: () => void;
    };
  };

  export default lottie;
}
