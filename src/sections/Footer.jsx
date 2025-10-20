import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          <a
            href="https://www.instagram.com/vansh_ahuja1/"
            target="_blank"
            rel="noreferrer"
            className="icon"
          >
            <img src="/images/insta.png" alt="Instagram" />
          </a>
          <a
            href="https://www.linkedin.com/in/vanshahuja1/"
            target="_blank"
            rel="noreferrer"
            className="icon"
          >
            <img src="/images/linkedin.png" alt="LinkedIn" />
          </a>
          <a
            href="https://github.com/Vanshahuja1"
            target="_blank"
            rel="noreferrer"
            className="icon"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github size={22} className="text-white" />
          </a>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()}  Vansh Ahuja . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
