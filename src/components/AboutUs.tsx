import gsap from "gsap";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import { useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";

const AboutUs = () => {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const context = gsap.context(() => {
      if (!isMobile) gsap.set(".mask-clip-path2", { clipPath: "polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)" });
      gsap
        .timeline({
          scrollTrigger: {
            scroller: ".main-container",
            trigger: "#clip",
            start: "51% center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            onLeaveBack: () => {
              if (!isMobile) gsap.to(".mask-clip-path2", { clipPath: "polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)" });
            },
            onUpdate: (self) => {
              if (isMobile) return;
              const progress = self.progress;
              const clipPathValue = `
                polygon(
                  ${gsap.utils.interpolate(14, 0, progress)}% 0%, 
                  ${gsap.utils.interpolate(82, 100, progress)}% 0%, 
                  ${gsap.utils.interpolate(80, 100, progress)}% 100%, 
                  ${gsap.utils.interpolate(6, 0, progress)}% 100%
                )
              `;
              gsap.to(".mask-clip-path2", { clipPath: clipPathValue });
            },
          },
        })
        .to(".mask-clip-path2", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
        });
    });
    return () => context.revert();
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen flex flex-col overflow-hidden bg-blue-50">
      <div className="flex relative mb-8 mt-36 flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">A THREE-YEAR JOURNEY</p>
        <AnimatedTitle
          title="GR<b>O</b>WING THROUGH REAL PROJECTS, TEAMS, AND <b>E</b>XPERIENCE"
          className="mt-5 w-full !text-black text-center"
        />
      </div>

      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <MouseParallaxChild factorX={0.3} factorY={0.5}>
          <div id="clip" className="relative h-dvh">
            <div
              className="mask-clip-path2 absolute left-1/2 top-0 z-20 h-96 w-[30vw] origin-center -translate-x-1/2 overflow-hidden rounded-3xl border border-black"
            >
              <img src={`${import.meta.env.BASE_URL}img/hackathon.jpg`} className="absolute inset-0 size-full object-cover" alt="Hackathon experience" />
            </div>
            <div className="about-subtext">
              <p className="capitalize">A journey of learning, building, and improving over three years</p>
              <p className="text-gray-500">
                From studying fundamentals to joining team projects and hackathon experiences, this path has helped me
                sharpen my web design, programming, presentation, and problem-solving skills.
              </p>
            </div>
          </div>
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </div>
  );
};

export default AboutUs;
