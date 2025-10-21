import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import { Skills } from "./sections/Skills";
import ScrollHint from "./components/ScrollHint";
import Zyntrix from "./sections/Zyntrix";
const App = () => (
  <>
    <Navbar />
    <Hero />
    <ScrollHint />
    <ShowcaseSection /> 
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <Skills />
    <Testimonials />
    <Zyntrix />
    <Contact />
    
    <Footer />
  </>
);

export default App;
