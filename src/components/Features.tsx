import { type CSSProperties, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import {
  SiBlockchaindotcom,
  SiDocker,
  SiFastapi,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiR,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { TiLocationArrow } from "react-icons/ti";
import vaytayUrl from "../../json/vaytay.json?url";

const projects = [
  {
    icon: SiBlockchaindotcom,
    eyebrow: ["Web3 Game", "Hackathon Project"],
    title: (
      <>
        W<b>a</b>tery
      </>
    ),
    subtitle: "Blockchain Fruit Merge Game",
    description: [
      "Watery is a Web3 game project built on the SUI Network. It combines fruit-merging gameplay with blockchain mechanics, NFT assets, and a digital item economy. Players can merge fruits to earn SEED Token, farm resources, collect items, and convert rare fruits into NFTs.",
      "The project was developed with Move smart contracts, React, TypeScript, and Vite. It focuses on simple gameplay, clear user experience, and practical blockchain usage in games. Built in a hackathon environment, Watery helped me gain hands-on experience in teamwork, UX/UI design, frontend development, and Web3 product building.",
    ],
    role: "Frontend Developer / UI-UX / Web3 Game Development",
    focus: "Blockchain, NFT, token economy, and simple gameplay",
    tech: ["React", "TypeScript", "Vite", "SUI Network", "Move", "Blockchain", "NFT"],
    github: "https://github.com/younglafire/WATERY",
    icons: [SiReact, SiTypescript, SiVite, SiBlockchaindotcom],
  },
  {
    icon: SiNextdotjs,
    eyebrow: ["Data Platform", "Web + API + Pipeline"],
    title: (
      <>
        Bitl<b>y</b>sis
      </>
    ),
    subtitle: "Cloud-based Data Analysis Platform",
    description: [
      "Bitlysis is a cloud-based platform for data and content analysis, designed around a Web + API + statistical pipeline architecture. It supports website analysis, Excel and Word file processing, text analysis, related article suggestions, and structured report generation.",
      "The project helps users import data, run analysis workflows, and receive clear, verifiable results. Bitlysis emphasizes backend transparency, report export capability, and advanced statistical analysis through an R pipeline.",
      "Technically, the platform uses Next.js for the frontend, FastAPI for the backend/API layer, and R scripts for advanced statistical processing. Python, TypeScript, and Docker are used to support development, deployment, and environment management.",
    ],
    role: "Web Developer / Data Analysis Platform Developer",
    focus: "Structured reports, transparent backend, API design, and statistical analysis",
    tech: ["Next.js", "TypeScript", "FastAPI", "Python", "R", "Docker", "API", "Data Analysis"],
    github: "https://github.com/riodangtien/Bitlysis",
    icons: [SiNextdotjs, SiFastapi, SiPython, SiR, SiDocker],
  },
];

const FallingProjectTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  let letterIndex = 0;

  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        titleElement.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(titleElement);

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={titleRef}
      className="special-font mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.88] md:text-8xl"
      aria-label={title}
    >
      {title.split(" ").map((word, wordIndex) => (
        <span key={word} aria-hidden="true">
          <span className="project-title-word inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const currentIndex = letterIndex++;

              return (
                <span
                  key={`${word}-${letter}-${currentIndex}`}
                  className="project-title-letter inline-block will-change-transform"
                  style={{
                    transitionDelay: `${currentIndex * 24}ms`,
                    "--fall-rotate": `${(currentIndex % 5 - 2) * 7}deg`,
                  } as CSSProperties}
                >
                  {letter}
                </span>
              );
            })}
          </span>
          {wordIndex < title.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
};

const VayTayShowcase = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = animationRef.current;
    if (!container) return;

    let animation: { destroy: () => void } | null = null;
    let cancelled = false;

    const loadAnimation = async () => {
      const lottie = (await import("three/examples/jsm/libs/lottie_canvas.module.js")).default;
      if (cancelled || !container) return;

      animation = lottie.loadAnimation({
        container,
        renderer: "canvas",
        loop: true,
        autoplay: true,
        path: vaytayUrl,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
          dpr: 1.5,
        },
      });
    };

    loadAnimation();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, []);

  return (
    <div className="pointer-events-none relative hidden min-h-[26rem] items-center justify-center lg:flex">
      <div className="absolute right-8 top-10 h-64 w-64 rotate-6 border border-yellow-300/20" />
      <div className="absolute right-28 bottom-14 h-40 w-40 -rotate-12 border border-white/10" />
      <div className="absolute right-6 top-1/2 h-px w-80 bg-blue-50/10" />

      <div className="relative z-10 w-[26rem] max-w-full">
        <div className="absolute -inset-6 rounded-full bg-yellow-300/5 blur-2xl" />
        <div ref={animationRef} className="relative aspect-[842/596] w-full" />
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="projects" className="bg-black pb-40 pt-28 text-blue-50">
      <div className="container mx-auto px-5 md:px-10">
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.65fr)]">
          <div className="max-w-3xl">
            <p className="font-general text-xs uppercase tracking-[0.28em] text-blue-50/60">Personal Projects</p>
            <FallingProjectTitle title="Projects built through real practice" />
            <p className="mt-6 max-w-xl font-circular-web text-lg text-blue-50/55">
              A focused showcase of personal products, hackathon experience, UI thinking, and technical development practice.
            </p>
          </div>
          <VayTayShowcase />
        </div>

        <div className="space-y-10">
          {projects.map((project, index) => {
            const MainIcon = project.icon;

            return (
              <article key={project.subtitle} className="relative overflow-hidden rounded-md border border-white/15 bg-[#101010] p-6 md:p-10">
                <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 border-l border-b border-white/10 bg-yellow-300/10" />
                <div className="pointer-events-none absolute bottom-8 right-10 hidden size-40 rotate-12 border border-yellow-300/40 md:block" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full border border-white/10" />
                <span className="pointer-events-none absolute right-7 top-6 font-general text-xs uppercase tracking-[0.3em] text-blue-50/25">
                  0{index + 1}
                </span>

                <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <span className="flex-center size-12 rounded-full bg-yellow-300 text-black">
                        <MainIcon className="text-2xl" />
                      </span>
                      {project.eyebrow.map((item) => (
                        <span key={item} className="rounded-full border border-white/15 px-4 py-2 font-general text-xs uppercase text-blue-50/70">
                          {item}
                        </span>
                      ))}
                    </div>

                    <h3 className="special-font text-5xl font-black uppercase leading-[0.9] md:text-7xl">{project.title}</h3>
                    <p className="mt-3 font-circular-web text-xl text-yellow-300">{project.subtitle}</p>

                    <div className="mt-8 space-y-5 font-circular-web text-base leading-relaxed text-blue-50/72 md:text-lg">
                      {project.description.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <aside className="relative border border-white/15 bg-black/45 p-5 md:p-7">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border border-white/10 p-4">
                        <SiReact className="mb-5 text-3xl text-yellow-300" />
                        <p className="font-general text-xs uppercase text-blue-50/50">Role</p>
                        <p className="mt-2 font-circular-web text-sm text-blue-50">{project.role}</p>
                      </div>
                      <div className="border border-white/10 p-4">
                        <SiBlockchaindotcom className="mb-5 text-3xl text-yellow-300" />
                        <p className="font-general text-xs uppercase text-blue-50/50">Focus</p>
                        <p className="mt-2 font-circular-web text-sm text-blue-50">{project.focus}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="font-general text-xs uppercase tracking-[0.22em] text-blue-50/50">Technology</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="border border-white/15 px-3 py-2 font-general text-xs uppercase text-blue-50/75">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 flex w-fit items-center gap-3 rounded-full bg-yellow-300 px-6 py-3 font-general text-xs uppercase text-black"
                    >
                      <FaGithub className="text-lg" />
                      View GitHub
                      <TiLocationArrow className="text-lg" />
                    </a>

                    <div className="mt-8 flex flex-wrap items-center gap-3 text-blue-50/40">
                      {project.icons.map((Icon, iconIndex) => (
                        <Icon key={iconIndex} />
                      ))}
                    </div>
                  </aside>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
