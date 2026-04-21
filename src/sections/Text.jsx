import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";




const Text = () => {
    useGSAP(() => {
      gsap.fromTo(
        ".text-section",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)",
          scrollTrigger: {
            trigger: ".text-section",
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        },
      );
    }, []);
  return (
    <section className="text-section size-full h-dvh">
      <div className="text-grid">
        <div className="text-h1-wrapper">
          <h1>
            Only in <br />
            Leonida
          </h1>
        </div>
        <div className="text-p-wrapper md:w-[615px]">
          <p>
            When the sun fades and the neon glows, <br />
            everyone has something to gain — and more to lose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Text;
