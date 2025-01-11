import React from "react";

type Props = {
  lineOfText: string;
  fontSize?: number;
};
const TextSpreader = ({ lineOfText, fontSize = 1.5 }: Props) => {
  return (
    <div
      style={{ fontSize: `${fontSize}rem` }}
      className="seoulEB select-none flex justify-between w-full bg-transparent"
    >
      {Object.values(lineOfText.split(" ")).map((word, i) => (
        <div className="flex gap-3" key={i}>
          {Object.values(word).map((letter, i) => (
            <p key={i}>{letter}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TextSpreader;
