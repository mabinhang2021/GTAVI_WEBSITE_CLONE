import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const NextCal = () => {
  const CalVideoRef = React.useRef(null);
  useGSAP(() => {
    gsap.set(".next-cal-text", { opacity: 0 });

    ScrollTrigger.create({
      trigger: ".next-cal-2",
      start: "top top",
      end: "+=1500",
      pin: true,
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: ".next-cal-2",
      start: "top top",
      end: "+=1500",
      onEnter: () => {
        gsap.to(".next-cal-text", {
          delay: 3,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(".next-cal-text", { opacity: 0, duration: 0.4 });
      },
    });

    CalVideoRef.current.onloadedmetadata = () => {
      gsap.to(CalVideoRef.current, {
        currentTime: CalVideoRef.current.duration,
        ease: "power1.inOut",
        duration: 3,
        scrollTrigger: {
          trigger: ".next-cal-2",
          start: "top top",
          end: "+=1500",
          scrub: true,
        },
      });
    };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".next-cal-5",
        start: "top center",
        end: "center center",
        scrub:true,
      },
    });
    tl.fromTo(
      ".next-cal-3",
      { opacity: 0, y: 100 },
      { opacity: 1, duration: 1, ease: "power1.inOut" },
    ).fromTo(
      ".next-cal-5",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power1.inOut" },
    )
      .fromTo(
        ".next-cal-description",
        { opacity: 0, y: 150 },
        { opacity: 1,y:-150, x:100,duration: 1, ease: "power1.inOut" },
        "<",
      );
  });

  return (
    <section className="next-cal">
      <div className="next-cal-grid">
        <div className="left-column">
          <div className="next-cal-1">
            <img src="/images/Cal-4.jpg" alt="Cal-4" />
          </div>
          <div className="next-cal-2">
            <video
              ref={CalVideoRef}
              src="/videos/Cal-.mp4"
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="next-cal-3">
            <img src="/images/Cal-2.jpg" alt="cal-2" />
          </div>
        </div>

        <div className="right-column">
          <div className="next-cal-4">
            <img src="/images/Cal-1.jpg" alt="cal-1" />
          </div>
          <div
            className="next-cal-placeholder"
            style={{ height: "1500px" }}
          ></div>
          <div className="next-cal-text">
            <p>
              There are way too many birds flying around in perfect formation.
            </p>
          </div>
          <div className="next-cal-5">
            <img src="/images/Cal-3.jpg" alt="cal-3" />
          </div>

          <div className="next-cal-description">
            <h2>The psychopaths are in charge. Get used to it.</h2>
            <div
              className="next-cal-placeholder"
              style={{ height: "50px" }}
            ></div>
            <p>
              Cal is at the low tide of America and happy there. Casual paranoia
              loves company, but his friend Jason has bigger plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextCal;
