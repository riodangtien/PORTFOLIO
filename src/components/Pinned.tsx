import { useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import PaginationScroll from "./PaginationScroll";

const Pinned = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".pagination");
      const paragraphs = gsap.utils.toArray(".pagination p");
      const lineContainers = gsap.utils.toArray(".lineContainer");
      gsap.set(paragraphs, { opacity: 0.3, scaleY: 0, visibility: "hidden" });
      gsap.set(lineContainers, { opacity: 0, visibility: "hidden", height: 0 });

      ScrollTrigger.create({
        trigger: ".ele",
        start: "top 70%",
        scroller: ".main-container",
        animation: gsap.to(".bg", { backgroundColor: "#edff66" }),
      });

      let cumulativeOffset = 0;
      items.forEach((item: HTMLDivElement | null | any, i: number) => {
        const line = item.querySelector(".line");
        const paragraph = item.querySelector("p");
        const title = item.querySelector("h4");
        const lineContainer = item.querySelector(".lineContainer");
        const lineAnimation = gsap
          .timeline({ paused: true })

          .fromTo(line, { y: -120 }, { y: 80, autoAlpha: 1 });
        const EnteryAnimation = gsap
          .timeline({ paused: true })
          .to(lineContainer, { height: "6rem", autoAlpha: 1, duration: 0.2 })
          .fromTo(title, { opacity: 0.3 }, { opacity: 1, duration: 0.3 })
          .to(paragraph, { scaleY: 1, autoAlpha: 1, duration: 0.3 });

        const start = `top+=${cumulativeOffset} center`;
        const animationDuration = 1000;
        const end = `+=${animationDuration}`;
        ScrollTrigger.create({
          trigger: item,
          start,
          end,
          scroller: ".main-container",
          animation: lineAnimation,
          scrub: 0.8,
          onEnter: () => EnteryAnimation.play(),
          onLeave: () => EnteryAnimation.reverse(),
          onEnterBack: () => EnteryAnimation.play(),
          onLeaveBack: () => EnteryAnimation.reverse(),
        });
        cumulativeOffset += animationDuration;
      });
      ScrollTrigger.create({
        trigger: ".bg",
        start: "8% top",
        end: "+=4000 top",
        scrub: 1.2,
        pin: true,
        scroller: ".main-container",

        pinSpacing: true,
        // animation: tl,
      });

      gsap.to(".achievement-mark", {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: ".bg",
          start: "top top",
          end: "+=4000 top",
          scrub: 0.6,
          scroller: ".main-container",
        },
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <section id="achievements" className="bg relative h-[113vh] w-full min-w-[100vw] overflow-hidden bg-[#edff66]">
      <div className="max-w-[1400px] pinned relative h-full w-full mx-auto">
        <div className="flex gap-5 px-5 py-4 md:px-10 flex-col items-start">
          <AnimatedTitle
            className="ele  lg:mt-32 mt-20 !items-start !p-0 !pl-0  !text-black"
            title="THREE YE<b>A</b>RS<br/>OF ACHIEVE<b>M</b>ENT"
          />

          <div className="pointer-events-none absolute right-10 top-[50%] hidden w-[30vw] max-w-[25rem] -translate-y-1/2 md:block">
            <div className="achievement-mark relative aspect-square">
              <span className="achievement-corner achievement-corner-1" />
              <span className="achievement-corner achievement-corner-2" />
              <span className="achievement-corner achievement-corner-3" />
              <span className="achievement-corner achievement-corner-4" />
              <span className="achievement-diamond" />
            </div>
          </div>

          <div className="flex mt-8 flex-col pl-0 md:pl-8 items-start ">
            <PaginationScroll
              num="01"
              title="IT Faculty Academic Contest Finalist"
              description="Reached the final round of the 3rd IT Faculty Academic Contest at Van Hien University for the 2024-2025 academic year."
            />
            <PaginationScroll
              title="InnoX 2026 Semifinalist"
              num="02"
              description="Two research topics, SOTA StatWorks and Bitlysis, advanced to the semifinals of Technology Innovation 2026 - InnoX: Beyond Limits, Touch the Future."
            />
            <PaginationScroll
              title="Watery Hackathon Awards"
              num="03"
              description="With team BitForce, joined the contest organized by First Movers Vietnam, CommandOSS and ITviec, winning Code Till Dawn Award and The Best UX."
            />
            <PaginationScroll
              title="Competitions Participated"
              num="04"
              description="Also joined LutusHacks 2026 (March 20-22), Hackathon Build on SUI Blockchain 2025, and IT Got Talent 2025, gaining practical experience even without an award."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pinned;
