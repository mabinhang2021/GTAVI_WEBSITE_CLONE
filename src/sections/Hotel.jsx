import React from "react";

const Hotel = () => {
  return (
    <section className="hotel-wrapper relative size-full overflow-hidden">
      <img
        className="hotel-img w-full h-full object-cover"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
        src="/images/Hotel.webp"
        alt=""
      />
    </section>
  );
};

export default Hotel;