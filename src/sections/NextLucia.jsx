import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NextLucia = () => {
  useGSAP(() => {
    gsap.set(".next-lucia", { marginTop: "-100vh" });
    gsap.set(".next-lucia-title", {
      x: 500,
      y: -150,
    });
    gsap.set(".next-lucia-content", {
      y: -80,
    });
    gsap.set(".next-lucia-text", {
      y: -50,
      x:200
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".next-lucia",
          start: "top 90%",
          end: "40% center",
          scrub: 2,
        },
      })
      .to(".car-vd", {
        opacity: 0,
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        ".next-lucia ",
        {
          scrollTrigger: {
            trigger: ".next-lucia",
            start: "top center",
            end: "80% center",
            scrub: 2,
          },
          delay: 1,
          y: -300,
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      );
  });

  return (
    <section className="next-lucia">
      <div className="next-lucia-title">
        <h1>
          "The only thing that matters is <br />
          who you know and what you got."
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-4 w-full px-4">
        <div className="flex flex-col md:w-236.75 md:h-421.25">
          <div className="next-lucia-text ms-70">
            <p>
              Fresh out of prison and ready to change the odds in her favor,
              Lucia's committed to her plan — no matter what it takes.
            </p>
          </div>
          <div className="next-lucia-3 ms-70">
            <img src="/images/lucia-4.webp" alt="" />
          </div>
        </div>
        <div className="flex flex-col ms-8">
          <div className="next-lucia-content">
            <h2>A life with Jason could be her way out.</h2>
          </div>
          <div className="next-lucia-1">
            <img src="/images/lucia-5.webp" alt="" />
          </div>
          <div className="next-lucia-2">
            <img src="/images/lucia-6.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextLucia;
