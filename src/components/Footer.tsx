import { FaEnvelope, FaGithub, FaTelegramPlane } from "react-icons/fa";

const socialLinks = [
  { href: "https://github.com/riodangtien", label: "GitHub", icon: <FaGithub /> },
  { href: "mailto:Dangdinhtien234204@gamil.com", label: "Email", icon: <FaEnvelope /> },
  { href: "https://t.me/ITieens", label: "Telegram", icon: <FaTelegramPlane /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">Copyright © Rio {new Date().getFullYear()}. All rights reserved.</p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a href="#video-frame" className="text-center text-sm font-light hover:underline md:text-right">
          Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
