import { useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Button from "./Button";

const WhatWeDo = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".whatwedo",
        start: "top 70%",
        scroller: ".main-container",
        animation: gsap.to(".whatwedo", { backgroundColor: "#DFDFF0" }),
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className="whatwedo py-8 lg:py-32  h-full min-h-dvh w-screen bg-yellow-300 overflow-hidden flex-col gap-10  flex justify-center items-center">
      <p className="font-general  text-sm uppercase md:text-[10px]">WHO I AM</p>
      <AnimatedTitle
        className="whatwedo-title !gap-1 !text-black"
        title="I'M BUILDING<br/> DIGITAL EXPERIENCES <br/> THAT COMBINE <br/> CODE, DESIGN <br/>AND PRODUCT<br/>THINKING"
      />
      <p className="max-w-xl px-5 text-center text-xs font-circular-web lg:text-sm">
        A personal portfolio shaped by web development, UI/UX design, and product-focused practice.
      </p>{" "}
      <a href="https://github.com/riodangtien" target="_blank" rel="noreferrer">
        <Button id="discover" title="VIEW GITHUB" containerClass="!bg-black  !text-white" />
      </a>
    </section>
  );
};

export default WhatWeDo;
