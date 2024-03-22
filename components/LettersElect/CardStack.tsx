"use client"

type Letter = {
  author: string;
  email: string;
  preview: string;
};

type CardStackProps = {
  letters: Letter[];
};

const CardStack: React.FC<CardStackProps> = ({ letters }) => {
  const CARD_OFFSET = 10;
  const SCALE_FACTOR = 0.06;

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {letters.map((letter, index) => (
        <div
          key={index}
          className="absolute bg-card/20 backdrop-blur-md h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-card-foreground/20 shadow-muted-foreground/20 flex flex-col justify-around"
          style={{
            top: index * -CARD_OFFSET,
            transformOrigin: "top center",
            scale: 1 - index * SCALE_FACTOR,
            zIndex: letters.length - index,
          }}
        >
          <div>
            <p className="font-medium text-muted-foreground">
              {letter.author}
            </p>
            <p className="font-normal text-muted-foreground">
              {letter.email}
            </p>
          </div>
          <div className="font-normal text-foreground">
            {letter.preview}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardStack;
