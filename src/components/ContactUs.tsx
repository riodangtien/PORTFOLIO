import { useEffect, useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import RioLogo from "./RioLogo";
import vaytayUrl from "../../json/vaytay.json?url";

const ImageClipBox = ({ src, clipClass }: { src: string; clipClass: string }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const LottieClipBox = ({ clipClass }: { clipClass: string }) => {
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
    <div className={clipClass}>
      <div ref={animationRef} className="size-full" />
    </div>
  );
};

const RotatingMark = () => (
  <div className="contact-rotating-mark">
    <RioLogo spinning className="contact-mark-inner" />
  </div>
);

const ContactUs = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-visible sm:block lg:left-20 lg:w-96">
          <RotatingMark />
          <LottieClipBox clipClass="contact-lottie-full lg:translate-y-10 translate-y-60" />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox src="/img/avtgit.jpg" clipClass="sword-man-clip-path md:scale-125" />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">Contact Me</p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild <br/> digital products <br/> t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-8xl !font-black !leading-[.9]"
          />

          <a href="mailto:Dangdinhtien234204@gamil.com">
            <Button id="contact-us" title="send email" containerClass="mt-10 cursor-pointer" />
          </a>

          <div className="contact-panel">
            <div>
              <span>Phone</span>
              <p>+84 366814835</p>
            </div>
            <div>
              <span>Location</span>
              <p>Ho Chi Minh City, Tan Binh</p>
            </div>
            <div>
              <span>Gmail</span>
              <p>Dangdinhtien234204@gamil.com</p>
            </div>
            <div>
              <span>Telegram</span>
              <p>@ITieens</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
