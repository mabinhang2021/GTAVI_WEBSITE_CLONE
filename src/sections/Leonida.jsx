import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Leonida = () => {
  useGSAP(() => {
    gsap.set(".leonida-h1-wrapper h1, .leonida-p-wrapper p", { opacity: 0, scale: 0.7 });

    gsap.to(".leonida-h1-wrapper h1, .leonida-p-wrapper p", {
      scale: 1,
      opacity: 1,
      duration: 1,
      maskImage:
        "radial-gradient(circle at 50% 100%, black 100%, transparent 100%)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".leonida-section",
        start: "top center",
        end: "center center",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="leonida-section h-[1050px]">
      <div className="leonida-grid">
        <div className="leonida-h1-wrapper">
          <h1>Only in Leonida</h1>
        </div>
        <div className="leonida-p-wrapper md:w-[615px]">
          <p>
            When the sun fades and the neon glows, <br />
            everyone has something to gain — and more to lose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Leonida;