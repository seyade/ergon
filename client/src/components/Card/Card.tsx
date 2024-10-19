import React from "react";

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
