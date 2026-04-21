import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Hero from "./sections/Hero";
import NavBar from "./sections/NavBar";
import FirstVideo from "./sections/FirstVideo";
import Jason from "./sections/Jason";
import ShootVideo from "./sections/ShootVideo";
import NextJason from "./sections/NextJason";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      
      <FirstVideo />
      <Jason />
      <ShootVideo />
      <NextJason/>
    </main>
  );
};

export default App;
