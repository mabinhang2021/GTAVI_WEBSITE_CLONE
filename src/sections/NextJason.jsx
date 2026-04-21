import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NextJason = () => {
  useGSAP(() => {
    gsap.set(".next-jason", { marginTop: "-100vh" });
    gsap.set(".next-jason-title", {
      x: 500,
      y: -150,
    });
    gsap.set(".next-jason-content", {
      x: 350,
      y: -100,
    });
    gsap.set(".next-jason-text", {
      y: -50,
    });
    
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".next-jason",
          start: "top 90%",
          end: "40% center",
          scrub: 2,
        },
      })
      .to(".shoot-vd", {
        opacity: 0,
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        ".next-jason ",
        {
          scrollTrigger: {
            trigger: ".next-jason",
            start: "top center",
            end: "80% center",
            scrub: 2,
          },
          y: -300,
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      );
  });
  return (
    <section className="next-jason">
      <div className="next-jason-title">
        <h1>
          "If anything happens,
          <br /> I'm right behind you."
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-20 w-full px-4">
        <div className="flex flex-col left-column">
          <div className="next-jason-content">
            <h2>Another day in paradise,right?</h2>
          </div>
          <div className="next-jason-1">
            <img src="/images/jason-5.webp" alt="" />
          </div>
          <div className="next-jason-2">
            <img src="/images/jason-6.webp" alt="" />
          </div>
        </div>

        <div className="flex flex-col md:w-236.75 md:h-421.25">
          <div className="next-jason-text">
            <p>
              Meeting Lucia could be the best or worst thing to ever happen to
              him.Jason knows how he'd like it to turn out but right now, it's
              hard to tell.
            </p>
          </div>
          <div className="next-jason-3">
            <img src="/images/jason-4.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextJason;