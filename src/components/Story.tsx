import { useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import { ScrollTrigger } from "gsap/all";

const Story = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lastSectionAnimation = gsap
        .timeline()
        .from(".lastSection p", {
          transform: "translate3d(0,100px,500px) rotateY(60deg) rotateX(-40deg)",
          transformOrigin: "50% 50% -50%",
          opacity: 0,
          duration: 1.4,
        })
        .from("#education-period", { y: 40, opacity: 0,duration: 1 }, "<");
      ScrollTrigger.create({
        trigger: ".lastSection",
        scroller: ".main-container",
        start: "top 90%",
        end: "bottom top",
        onUpdate: (self) => {
          if (self.direction === -1) lastSectionAnimation.reverse();
          else lastSectionAnimation.play();
        },
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <section id="story" className="  min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className=" font-general text-sm uppercase md:text-[10px]">education background</p>
        <div className=" relative size-full">
          <AnimatedTitle
            sectionId="storyTitle"
            className="
             mt-5 pointer-events-none   mix-blend-difference relative z-10"
            title="EDUCATI<b>o</b>N <br/> ACADEMIC PATH"
          />
          <div className=" w-full imgtilt story-img-container  h-[90vh] md:h-dvh relative">
            <div className=" story-img-mask">
              <div className="story-img-content">
                <img src={`${import.meta.env.BASE_URL}img/avt.jpg`} alt="Dang Dinh Tien avatar" className="object-contain" />
              </div>
            </div>
            <RoundedCorners />
          </div>
          <div className="lastSection z-20 -mt-72 flex w-full justify-center px-6 md:absolute md:right-12 md:top-[48%] md:mt-0 md:w-[22rem] md:justify-start md:px-0 lg:right-24 xl:right-40">
            <div className="flex h-full w-fit flex-col items-center md:items-start">
              <p
                style={{ perspective: "600px" }}
                className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start lg:max-w-md"
              >
                Growth
              </p>{" "}
              <span
                id="education-period"
                className="mt-5 rounded-full bg-violet-50 px-7 py-3 font-general text-xs uppercase text-black"
              >
                2024 - Present
              </span>
            </div>
          </div>
          <div className="education-deck">
            <div className="education-line" />
            <article className="education-card">
              <span>01</span>
              <h3>Van Hien University</h3>
              <p>Information Technology student building a strong foundation in web development, product thinking, and teamwork.</p>
            </article>
            <article className="education-card">
              <span>02</span>
              <h3>GPA 3.31</h3>
              <p>Maintaining consistent academic progress while gaining practical experience through hackathons and real-world projects.</p>
            </article>
            <article className="education-card">
              <span>03</span>
              <h3>Career Direction</h3>
              <p>Aspiring Frontend Developer with an interest in UI/UX Design and Full-stack Development, guided by a product-focused mindset.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
