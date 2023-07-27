import React from "react";

function PokeGenButton(props: {
  gen: number;
  genFilter: number;
  setGenFilter: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { gen, genFilter, setGenFilter } = props;
  const isSelected = gen === genFilter;

  const handleGenSelect: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isSelected) setGenFilter((prev) => gen);
    else setGenFilter((prev) => 0);
  };

  return <button onClick={handleGenSelect}>{gen}</button>;
}

export default PokeGenButton;
