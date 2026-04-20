import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ViceCity = () => {
  // useGSAP(() => {
  //   gsap.set(".vice-city-same-text", { opacity: 0 });
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".vice-city-section",
  //       start: "top top",
  //       end: "+=200%",
  //       scrub: 2.5,
  //       pin: true,
  //     },
  //   });

  //   tl.to("entrance-message", {
  //     opacity: 0,
  //     duration: 1,
  //     ease: "power1.inOut",
  //   })

  //     .to(".vice-city-same-text", {
  //       scale: 0.7,
  //       opacity: 1,
  //       duration: 1,
  //       maskImage:
  //         "radial-gradient(circle at 50% 100%, black 100%, transparent 100%)",
  //       ease: "power1.inOut",
  //     })
  //     .to(".vice-city-same-text", {
  //       opacity: 0,
  //       duration: 0.5,
  //     });
  // });

  return (
    <section className="vice-city-section">
      <div className="h-dvh flex flex-col justify-center items-center text-center px-4">
        <h3 className="vice-city-text vice-city-same-text">Vice City, USA.</h3>
        <p className="vice-city-description  vice-city-same-text">
          Jason and Lucia have always known the deck is stacked against them.
          But when an east score goes wrong, they find themselves on the darkest
          side of the sunniest place in America, in the middle of a criminal
          conspiracy stretching across the state of Leonida - forced to rely on
          each other other more than ever if they want to make it out alive.
        </p>
      </div>
    </section>
  );
};

export default ViceCity;
