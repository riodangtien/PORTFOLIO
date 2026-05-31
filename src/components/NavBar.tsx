import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi";
import { useSmoothScroll } from "../context/ScrollProviderContext";
import gsap from "gsap";
import RioLogo from "./RioLogo";

const NavBar = () => {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const { locoScroll, progress } = useSmoothScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: "About", target: "#about" },
    { label: "Projects", target: "#projects" },
    { label: "Achievements", target: "#achievements" },
    { label: "Education", target: "#story" },
    { label: "Contact", target: "#contact" },
  ];

  const audioElementRef = useRef<HTMLAudioElement | null>();
  const toggleAudio = () => {
    setIsAudioPlaying((p) => !p);
    setIsIndicatorActive((i) => !i);
  };
  useEffect(() => {
    if (!audioElementRef.current) return;
    if (isAudioPlaying) audioElementRef.current.play();
    else audioElementRef.current.pause();
  }, [isAudioPlaying]);
  useEffect(() => {
    if (!navContainerRef.current) return;
    if (progress <= 10) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (progress > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (progress < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(progress);
  }, [progress]);
  useEffect(() => {
    gsap.to(navContainerRef.current, { y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0, duration: 0.2 });
  }, [isNavVisible]);
  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 ${
        progress <= 10 ? "top-nav" : ""
      }`}
    >
      <header className=" absolute top-1/2 w-full  -translate-y-1/2">
        <nav className=" flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <RioLogo className="size-10" />
            <Button
              id="product-btn"
              title="products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 hidden lg:flex items-center justify-center gap-1"
              onClick={() => locoScroll?.scrollTo("#projects", { duration: 0 })}
            />
          </div>
          <div className=" flex h-full items-center ">
            <div className=" hidden lg:block">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => locoScroll?.scrollTo(item.target, { duration: 0 })}
                  className="nav-hover-btn"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="mobile-menu-toggle ml-5 p-1 text-2xl lg:hidden"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
            <button onClick={toggleAudio} className=" ml-10 p-1 flex items-center space-x-0.5">
              <audio ref={audioElementRef} src={`${import.meta.env.BASE_URL}audio/loop.mp3`} loop className=" hidden" />
              {[1, 2, 3, 4].map((index) => (
                <div
                  style={{ animationDelay: `${index * 0.1}s` }}
                  key={index}
                  className={` ${isIndicatorActive ? "active" : ""} indicator-line`}
                />
              ))}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="mobile-nav-panel lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => {
                  locoScroll?.scrollTo(item.target, { duration: 0 });
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
