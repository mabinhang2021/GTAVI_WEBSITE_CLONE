import React from 'react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const ShootVideo = () => {
     const shootVideo = React.useRef(null);
     useGSAP(() => {
       gsap.set(".shoot", { marginTop: "-150vh", opacity: 0 });
       gsap.set(".shoot-vd", { scale:1.2 });
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: ".shoot",
           start: "top top",
           end: "+=200%",
           scrub: true,
           pin: true,
         },
       });
       tl
       .to(".jason",{
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
       })
       .to(
         ".shoot",
         {
            delay:1,
           duration: 2,
           opacity: 1,
           ease: "power1.inOut",
         },
         "<",
       );

       shootVideo.current.onloadedmetadata = () => {
         tl.to(
           shootVideo.current,
           {
             currentTime: shootVideo.current.duration,
             ease: "power1.inOut",
             duration: 2,
           },
           "<",
         );
       };
     }, []);
  return (
    <section className="shoot">
      <div className="h-dvh">
        <video
          ref={shootVideo}
          className="shoot-vd"
          src="/videos/shoot.mp4"
          muted
          playsInline
        />
      </div>
    </section>
  );
}

export default ShootVideo