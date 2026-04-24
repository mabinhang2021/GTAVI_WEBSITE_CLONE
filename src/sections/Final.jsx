import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
const Final = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.set(".final-content", { opacity: 0 });
    gsap.timeline({
      scrollTrigger: {
        trigger: ".final",
        start: "top top",
        end: "90% top",
        scrub: true,
        pin: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".final",
        start: "top 80%",
        end: "90% top",
        scrub: true,
      },
    });
    tl.to(
      ".final-content",
      {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: "power1.inOut",
      },
      "<",
    );
    videoRef.current.onloadedmetadata = () => {
      tl.to(
        videoRef.current,
        {
          currentTime: videoRef.current.duration,
          ease: "power1.inOut",
          duration: 3,
        },
        "<",
      );
    };
  }, []);

  return (
    <section className="final">
      <div className="size-full final-content">
        <video
          ref={videoRef}
          className="size-full object-cover"
          src="/videos/final.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
};

export default Final;
