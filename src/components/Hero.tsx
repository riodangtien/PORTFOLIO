import gsap from "gsap";
import { useEffect, useRef } from "react";
import Button from "./Button";
import { TiLocation } from "react-icons/ti";
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

const techIcons = [
  { label: "HTML5", Icon: SiHtml5 },
  { label: "CSS3", Icon: SiCss3 },
  { label: "JavaScript", Icon: SiJavascript },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "React", Icon: SiReact },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "Tailwind", Icon: SiTailwindcss },
  { label: "Vite", Icon: SiVite },
];

const TechMarquee = () => {
  const items = [...techIcons, ...techIcons, ...techIcons];

  return (
    <div className="tech-marquee" aria-hidden="true">
      <div className="tech-marquee-track">
        {items.map(({ label, Icon }, index) => (
          <span className="tech-marquee-item" key={`${label}-${index}`}>
            <Icon />
            <span>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const revealLayerRef = useRef<HTMLDivElement | null>(null);
  const revealBoxRef = useRef<HTMLDivElement | null>(null);
  const revealImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const revealLayer = revealLayerRef.current;
    const revealBox = revealBoxRef.current;
    const revealImage = revealImageRef.current;

    if (!frame || !revealLayer || !revealBox || !revealImage) return;

    const hideReveal = () => {
      gsap.to([revealLayer, revealBox], { autoAlpha: 0, duration: 0.25, ease: "power2.out" });
    };

    const moveReveal = (e: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      const revealSize = revealBox.offsetWidth;
      const imageWidth = Math.min(revealImage.naturalWidth || 460, rect.width);
      const imageHeight = Math.min(revealImage.naturalHeight || 460, rect.height);
      const imageLeft = (rect.width - imageWidth) / 2;
      const imageTop = (rect.height - imageHeight) / 2;
      const imageRight = imageLeft + imageWidth;
      const imageBottom = imageTop + imageHeight;
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      if (pointerX < imageLeft || pointerX > imageRight || pointerY < imageTop || pointerY > imageBottom) {
        hideReveal();
        return;
      }

      const left = Math.min(Math.max(e.clientX - rect.left - revealSize / 2, 16), rect.width - revealSize - 16);
      const top = Math.min(Math.max(e.clientY - rect.top - revealSize / 2, 16), rect.height - revealSize - 16);
      const boundedLeft = Math.min(Math.max(left, imageLeft), imageRight - revealSize);
      const boundedTop = Math.min(Math.max(top, imageTop), imageBottom - revealSize);
      const right = rect.width - boundedLeft - revealSize;
      const bottom = rect.height - boundedTop - revealSize;

      gsap.to(revealLayer, {
        autoAlpha: 1,
        clipPath: `inset(${boundedTop}px ${right}px ${bottom}px ${boundedLeft}px)`,
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(revealBox, {
        autoAlpha: 1,
        x: boundedLeft,
        y: boundedTop,
        duration: 0.2,
        ease: "power3.out",
      });

    };

    frame.addEventListener("pointermove", moveReveal);
    frame.addEventListener("pointerleave", hideReveal);

    return () => {
      frame.removeEventListener("pointermove", moveReveal);
      frame.removeEventListener("pointerleave", hideReveal);
    };
  }, []);

  return (
    <div ref={heroRef} className=" relative  h-dvh   hero w-screen overflow-x-hidden">
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        {" "}
        <div ref={frameRef} className="hero-avatar-frame video-container">
          <img src="/img/avtgit.jpg" alt="" aria-hidden="true" className="hero-avatar-layer opacity-0" />
          <img
            src="/img/avt.jpg"
            alt="Avatar"
            className="hero-avatar-layer"
          />
          <div ref={revealLayerRef} className="hero-reveal-layer" aria-hidden="true">
            <img ref={revealImageRef} src="/img/avtgit.jpg" alt="" className="hero-avatar-layer" />
          </div>
          <div ref={revealBoxRef} className="hero-reveal-box" aria-hidden="true" />
        </div>
        <div className="hero-info-panel" aria-hidden="true" />
        <div className="hero-portfolio-panel" aria-hidden="true" />
        <TechMarquee />
        <section className="hero-about-card" aria-label="About Dang Dinh Tien">
          <p className="hero-kicker font-general text-xs uppercase text-black/60">About Me</p>
          <p className="font-robert-regular text-sm leading-relaxed text-black/80">
            Hello, I am Dang Dinh Tien. I am a responsible learner who always strives to improve myself in both study and work.
          </p>
          <p className="font-robert-regular text-sm leading-relaxed text-black/80">
            I am interested in technology, web design, programming, and digital product development. I hope to gain more practical experience, grow my professional skills, and contribute value to the projects I join.
          </p>
          <div className="hero-skill-row">
            <span>Teamwork</span>
            <span>Research</span>
            <span>Problem Solving</span>
          </div>
        </section>
        <h1 className="special-font hero-portfolio-title absolute bottom-10 right-10 z-40 text-black">
           <b>PORT</b>FOLIO
        </h1>
        <div className=" pointer-events-none absolute left-0 top-0 z-40 size-full">
          <div className="hero-intro-content mt-20 px-5 sm:px-10">
            <p className="hero-kicker font-general text-xs uppercase text-black/70">Personal Portfolio</p>
            <h2 className=" special-font hero-heading text-black">
              Ri <b>o</b>
            </h2>
            <p className=" mb-5 max-w-64 font-robert-regular text-black ">
              WEB DEVELOPER & UI/UX <br />
            </p>
            <p className="mb-5 max-w-72 font-robert-regular text-sm leading-relaxed text-black/75">
              Dang Dinh Tien, focused on technology, web design, and digital product development.
            </p>
            <a href="https://github.com/riodangtien" target="_blank" rel="noreferrer" className="pointer-events-auto w-fit">
              <Button id="watch-trailer" title="github.com/riodangtien" leftIcon={<TiLocation />} containerClass="bg-yellow-300 flex-center gap-1" />
            </a>
          </div>
        </div>
      </div>
      <h1 className="special-font hero-portfolio-title absolute bottom-10 right-10 text-black">
         <b>PORT</b>FOLIO
      </h1>
    </div>
  );
};

export default Hero;
