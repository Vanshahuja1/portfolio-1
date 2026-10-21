import Hero from "../sections/Hero";
import ScrollHint from "../components/ScrollHint";
import ShowcaseSection from "../sections/ShowcaseSection";
import LogoShowcase from "../sections/LogoShowcase";
import FeatureCards from "../sections/FeatureCards";
import Experience from "../sections/Experience";
import Skills from "../sections/Skills";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";

const Home = () => (
  <>
    <Hero />
    <ScrollHint />
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <Skills />
    <Testimonials />
    <Contact />
  </>
);

export default Home;
