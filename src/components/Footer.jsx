import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-6 md:px-8 gap-4 md:gap-0">
        <p className="text-sm md:text-base">
          Copyright &copy; {new Date().getFullYear()}
        </p>

        <div className="flex gap-4">
          <a
            href="https://facebook.com/dnjosh10"
            aria-label="Facebook"
            className="hover:scale-150 transition-transform"
          >
            <FaFacebook className="text-blue-500 text-xl md:text-2xl" />
          </a>
          <a
            href="https://twitter.com/dnjosh10"
            aria-label="Twitter"
            className="hover:scale-150 transition-transform"
          >
            <FaTwitter className="text-blue-400 text-xl md:text-2xl" />
          </a>
          <a
            href="https://github.com/dumte"
            aria-label="Github"
            className="hover:scale-150 transition-transform"
          >
            <FaGithub className="text-blue-400 text-xl md:text-2xl" />
          </a>
          <a
            href="https://linkedin.com/in/dnjosh10"
            aria-label="LinkedIn"
            className="hover:scale-150 transition-transform"
          >
            <FaLinkedin className="text-blue-400 text-xl md:text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
