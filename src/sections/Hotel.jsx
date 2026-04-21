import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hotel = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hotel-img",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)",
        scrollTrigger: {
          trigger: ".hotel-wrapper",
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="hotel-wrapper relative size-full overflow-hidden">
      <img
        className="hotel-img w-full h-full object-cover"
        src="/images/Hotel.webp"
        alt=""
      />
    </section>
  );
};

export default Hotel;