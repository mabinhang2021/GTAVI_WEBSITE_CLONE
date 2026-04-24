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
import Leonida from "./sections/Leonida";
import Cal from "./sections/Cal";
import NextCal from "./sections/NextCal";
import PostCard from "./sections/PostCard";
import Final from "./sections/Final";
import Outro from "./sections/Outro";

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
      <Leonida />

      <Cal />
      <NextCal />
      <PostCard />

      <Final/>
      <Outro/>
    </main>
  );
};

export default App;
