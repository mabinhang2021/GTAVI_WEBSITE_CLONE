import React from "react";
import ComingSoon from "./ComingSoon";
import { useMaskSettings } from "../../constants";
import ViceCity from "./ViceCity";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskPos, maskSize } =
    useMaskSettings();

  useGSAP(() => {
    gsap.set(".mask-wrapper", {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });
    gsap.set(".vice-city-same-text", { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        pin: true,
        start: "top top",
        end: "+=400%",
        scrub: 2.5,
      },
    });

    tl.to(".fade-out", { opacity: 0, ease: "power1.inOut" })
      .to(".scale-out", { scale: 1, ease: "power1.inOut" })
      .to(
        ".mask-wrapper",
        {
          maskSize: maskSize,
          ease: "power1.inOut",
        },
        "<",
      )
      .to(".mask-wrapper", { opacity: 0 })
      .to(".overlay-logo", { opacity: 1 }, "<")
      .to(
        ".entrance-message",
        {
          duration: 1,
          ease: "power1.inOut",
          maskImage:
            "radial-gradient(circle at 50% 0vh,black 50%,transparent 100%)",
        },
        "<",
      )
      .to(".entrance-message", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        ".overlay-logo",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      )
      .to(".vice-city-same-text", {
        scale: 0.7,
        opacity: 1,
        duration: 1,
        maskImage:
          "radial-gradient(circle at 50% 100%, black 100%, transparent 100%)",
        ease: "power1.inOut",
      })
      .to(".vice-city-same-text", {
        opacity: 0,
        duration: 0.5,
      });
  });

  return (
    <section className="hero-section">
      <div className="size-full mask-wrapper">
        <img
          src="/images/hero-bg.webp"
          alt="hero background"
          className="scale-out"
        />
        <img
          src="/images/hero-text.webp"
          alt="GTA LOGO"
          className="title-logo fade-out"
        />
        <img
          src="/images/watch-trailer.png"
          alt="trailer"
          className="trailer-logo fade-out"
        />
        <div className="play-img fade-out">
          <img src="/images/play.png" alt="play" className="w-7 ml-1" />
        </div>
      </div>

      {/* <div>
        <img
          src="/images/big-hero-text.svg"
          alt="logo"
          className="size-full object-cover mask-logo"
        />
      </div> */}

      <div className="fake-logo-wrapper">
        <img src="/images/big-hero-text.svg" className="overlay-logo" />
      </div>
      <ComingSoon />
      <ViceCity />
    </section>
  );
};

export default Hero;
