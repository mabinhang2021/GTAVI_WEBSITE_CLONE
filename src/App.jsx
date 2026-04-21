import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Hero from "./sections/Hero";
import NavBar from "./sections/NavBar";
import FirstVideo from "./sections/FirstVideo";
import Jason from "./sections/Jason";
import ShootVideo from "./sections/ShootVideo";
import NextJason from "./sections/NextJason";
import SecondVideo from "./sections/SecondVideo";
import Lucia from "./sections/Lucia";
import CarVideo from "./sections/CarVideo";
import NextLucia from "./sections/NextLucia";
import Hotel from "./sections/Hotel";
import Text from "./sections/Text";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />

      <FirstVideo />
      <Jason />
      <ShootVideo />
      <NextJason />

      <SecondVideo />
      <Lucia />
      <CarVideo />
      <NextLucia />

      <Hotel />
      <Text/>
      
    </main>
  );
};

export default App;
