import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FirstVideo = () => {
  const videoRef = React.useRef(null);

  useGSAP(() => {
    gsap.set(".first-vd-wrapper", { marginTop: "-150vh", opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
      },
    });
    tl.to(
      ".first-vd-wrapper",
      {
        duration: 2,
        opacity: 1,
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
    <section className="first-vd-wrapper">
      <div className="h-dvh">
        <video
          ref={videoRef}
          className="first-vd"
          src="/videos/output1.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
};

export default FirstVideo;
