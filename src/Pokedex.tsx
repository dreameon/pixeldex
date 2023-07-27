import React, { useState } from "react";
import PokeTypeButton from "./PokeTypeButton";
import PokeGrid from "./PokeGrid";
import PokeGenButton from "./PokeGenButton";

enum PokeTypes {
  normal,
  fire,
  water,
  electric,
  grass,
  ice,
  fighting,
  poison,
  ground,
  flying,
  psychic,
  bug,
  rock,
  ghost,
  dragon,
  dark,
  steel,
  fairy,
}

enum Generations {
  gen1 = 1,
  gen2 = 2,
  gen3 = 3,
  gen4 = 4,
  gen5 = 5,
  gen6 = 6,
  gen7 = 7,
}

export type PokeType = keyof typeof PokeTypes;
// export type Generation = keyof typeof Generations;
export type Pokemon = {
  type: PokeType;
  generation_id: number;
  name: string;
  id: number;
};

function Pokedex() {
  const [typeFilter, setTypeFilter] = useState(new Set<PokeType>());
  const [genFilter, setGenFilter] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState(0);
  const [isShiny, setShiny] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleShinyToggle = () => {
    setShiny((prev) => !prev);
  };

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (Number(value)) {
      setIdFilter((prev) => Number(value));
      setNameFilter((prev) => "");
    } else {
      setNameFilter((prev) => ".*" + value + ".*");
      setIdFilter((prev) => 0);
    }
    setSearchValue((prev) => value);
  };

  return (
    <div>
      <div className="sidebar">
        <button onClick={handleShinyToggle}>Toggle Shiny</button>
        <div className="typeSelect">
          {(
            Object.keys(PokeTypes).filter((v) => isNaN(Number(v))) as PokeType[]
          ).map((type) => {
            return (
              <PokeTypeButton
                key={type}
                setTypeFilter={setTypeFilter}
                typeFilter={typeFilter}
                type={type}
              />
            );
          })}
        </div>
        <form>
          <input
            value={searchValue}
            placeholder="search by name or pokedéx number"
            onChange={handleSearch}
          />
        </form>
        <div className="genSelect">
          {Object.values(Generations)
            .filter((v) => !isNaN(Number(v)))
            .map((gen) => {
              return (
                <PokeGenButton
                  key={gen}
                  gen={Number(gen)}
                  genFilter={genFilter}
                  setGenFilter={setGenFilter}
                />
              );
            })}
        </div>
      </div>
      <PokeGrid
        types={typeFilter}
        gen={genFilter}
        name={nameFilter}
        id={idFilter}
        isShiny={isShiny}
      />
    </div>
  );
}

export default Pokedex;
