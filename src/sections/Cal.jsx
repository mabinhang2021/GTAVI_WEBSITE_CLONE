import React from "react";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";

const Cal = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".cal",
      {
        clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)",
        boxShadow: "inset 200px 0 150px -80px rgba(0,0,0,0.9)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        boxShadow: "inset 0 0 0 0 rgba(0,0,0,0)",
        ease: "none",
        scrollTrigger: {
          trigger: ".cal",
          start: "top 80%",
          end: "top top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".cal-content",
      {
        opacity: 0,
        x: -200,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: ".cal",
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="cal">
      <div className="cal-content">
        <div>
          <h1>Cal Hampton</h1>
        </div>
        <div>
          <h2>What if everything on the internet was true?</h2>
        </div>
        <div>
          <p>
            Jason's friend and a fellow associate of Brian's, Cal feels safest
            hanging at home, snooping on Coast Guard comms with a few beers and
            some private browser tabs open.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cal;
