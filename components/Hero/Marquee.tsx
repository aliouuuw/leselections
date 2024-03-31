import React from "react";

const Marquee = ({ items }: any) => {
  return (
    <div className="relative flex items-center overflow-x-hidden col-span-2">
      <div className=" h-fit flex items-center animate-marquee whitespace-nowrap">
        {items.map((item: string, index: number) => (
          <div key={index}>
            |<span className="text-sm mx-6">{item}</span>
          </div>
        ))}
      </div>
      <div className="absolute flex items-center h-fit top-0 animate-marquee2 whitespace-nowrap">
        {items.map((item: string, index: number) => (
          <div key={index}>
            |<span className="text-sm mx-6">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
