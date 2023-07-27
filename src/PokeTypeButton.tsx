import React from "react";
import { PokeType } from "./Pokedex";

const pokemonTypes : Record<PokeType, string> = {
  normal: "#a6a09f",
  fire: "#f2534e",
  water: "#a6def7",
  electric: "#f2d583",
  grass: "#bde08b",
  ice: "#afecf0",
  fighting: "#a8816d",
  poison: "#b37fa2",
  ground: "#e3ce96",
  flying: "#a5bae6",
  psychic: "#f28fc7",
  bug: "#bfd681",
  rock: "#c7ba91",
  ghost: "#84799c",
  dragon: "#8f7dbd",
  dark: "#6e5b59",
  steel: "#c0c1c2",
  fairy: "#f0c5e0",
};


function PokeTypeButton(props : {type : PokeType, typeFilter : Set<PokeType>, setTypeFilter : React.Dispatch<React.SetStateAction<Set<PokeType>>>}) {
  const { type, typeFilter, setTypeFilter } = props;
  const isSelected = typeFilter.has(type);

  const handleTypeSelect = () => {
      if (typeFilter.size < 2 && !isSelected) {
        setTypeFilter((prev) => {
            const newTypes = new Set(prev);
            newTypes.add(type);
            return newTypes;
        });
      }
      if (isSelected) {
        setTypeFilter((prev) => {
            const newTypes = new Set(prev);
            newTypes.delete(type);
            return newTypes;
        });
      }
    };

  return (
    <button
      style={{ backgroundColor: pokemonTypes[type] }}
      onClick={handleTypeSelect}
    >
      {type}
    </button>
  );
}

export default PokeTypeButton;
