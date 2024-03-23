"use client";

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";

type Letter = {
  author: string;
  email: string;
  preview: string;
};

type CardStackProps = {
  letters: Letter[];
};

const CardStack: React.FC<CardStackProps> = ({ letters }) => {
  const [stackOrder, setStackOrder] = useState<number[]>(
    Array.from(Array(letters.length).keys())
  );

  const CARD_OFFSET = 20;
  const SCALE_FACTOR = 0.06;

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my], direction: [dx, dy], distance }) => {
      if (down) {
        setStackOrder((order) => {
          const newOrder = [...order];
          newOrder.unshift(newOrder.pop()!); // Move top card to the front
          return newOrder;
        });
      }
    },
  });

  return (
    <div className="relative h-[30rem] w-[40rem] border">
      {stackOrder.map((index, i) => {
        const isTopCard = i === 0;

        return (
          <animated.div
            key={index}
            {...(isTopCard ? bind() : {})}
            className={`absolute bg-card/20 backdrop-blur-md h-[15rem] w-[30rem] rounded-3xl p-4 shadow-xl border border-card-foreground/20 shadow-muted-foreground/20 flex flex-col justify-around ${
              isTopCard ? "cursor-grabbing" : ""
            }`}
            style={{
              top: i * -CARD_OFFSET + "px",
              transform: `scale(${1 - i * SCALE_FACTOR})`,
              zIndex: letters.length - i,
            }}
          >
            <div className="text-sm">
              <div className="font-semibold">{letters[index].author}</div>
              <div className="text-xs text-muted-foreground">
                {letters[index].email}
              </div>
            </div>
            <div className="text-base text-pretty">
              <p>{letters[index].preview}</p>
            </div>
          </animated.div>
        );
      })}
    </div>
  );
};

export default CardStack;
