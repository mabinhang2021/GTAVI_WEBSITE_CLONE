import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SecondVideo = () => {
  const secondVideoRef = React.useRef(null);

  useGSAP(() => {
    gsap.set(".second-vd-wrapper", { marginTop: "-150vh", opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".second-vd-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: 2,
        pin: true,
      },
    });
    tl.to(".next-jason", {
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    }).to(
      ".second-vd-wrapper",
      {
        duration: 2,
        opacity: 1,
        ease: "power1.inOut",
      },
      "<",
    );

    secondVideoRef.current.onloadedmetadata = () => {
      tl.to(
        secondVideoRef.current,
        {
          currentTime: secondVideoRef.current.duration,
          ease: "power1.inOut",
          duration: 3,
        },
        "<",
      );
    };
  });

  return (
    <section className="second-vd-wrapper">
      <div className="h-dvh">
        <video
          src="/videos/Lucia.mp4"
          className="second-vd"
          ref={secondVideoRef}
          muted
          playsInline
          preload="auto"
          style={{
            objectPosition: "15% 0%",
          }}
        />
      </div>
    </section>
  );
};

export default SecondVideo;
