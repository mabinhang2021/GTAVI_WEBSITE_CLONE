import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CarVideo = () => {
  const CarVideo = React.useRef(null);

     useGSAP(() => {
       gsap.set(".car", { marginTop: "-150vh", opacity: 0 });
       gsap.set(".car-vd", { scale: 1.2 });
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: ".car",
           start: "top top",
           end: "+=200%",
           scrub: true,
           pin: true,
         },
       });
       tl.to(".lucia", {
         opacity: 0,
         duration: 1,
         ease: "power1.inOut",
       }).to(
         ".car",
         {
           delay: 1,
           duration: 3,
           opacity: 1,
           ease: "power1.inOut",
         },
         "<",
       );

       CarVideo.current.onloadedmetadata = () => {
         tl.to(
           CarVideo.current,
           {
             currentTime: CarVideo.current.duration,
             ease: "power1.inOut",
             duration: 2,
             scale:1,
           },
           "<",
         );
       };
     }, []);




  return (
    <section className="car">
      <div className="h-dvh">
        <video
          ref={CarVideo}
          className="car-vd"
          src="/videos/Car.mp4"
          muted
          playsInline
        />
      </div>
    </section>
  );
};

export default CarVideo;
