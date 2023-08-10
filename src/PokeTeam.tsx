import PokeTeamCard from "./PokeTeamCard";
import { Pokemon } from "./Pokedex";
import React from "react";

function PokeTeam(props: {
  isShiny: boolean;
  selectedTeam: (Pokemon | null)[];
  setSelectedTeam: React.Dispatch<React.SetStateAction<(Pokemon | null)[]>>;
  availableSlots: number[];
  setAvailableSlots: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const {
    isShiny,
    selectedTeam,
    setSelectedTeam,
  } = props;

  const handleClick = (id: number) => {
    setSelectedTeam((prev) => {
      const newTeam = [...prev];
      newTeam[id] = null;
      // const index = newTeam.indexOf(pokemon);
      // delete newTeam[index];
      return newTeam;
    });
    //   setAvailableSlots((prev) => [...prev, id + 1]);
    //   console.log(availableSlots);
  };

  return (
    <div className="pokeTeam">
      <div className="teamRow">
        {selectedTeam.slice(0, 3).map((pokemon: Pokemon | null, id: number) => {
          // const handleOver = () => 0;
          // const handleOut = () => 0;
          return (
            <PokeTeamCard
              key={id}
              id={id}
              // handleOver={handleOver}
              // handleOut={handleOut}
              handleClick={() => handleClick(id)}
              pokemon={pokemon}
              isShiny={isShiny}
              selectedTeam={selectedTeam}
            />
          );
        })}
      </div>
      <div className="teamRow">
        {selectedTeam.slice(3, 6).map((pokemon: Pokemon | null, id: number) => {
          // const handleOver = () => 0;
          // const handleOut = () => 0;
          return (
            <PokeTeamCard
              key={id+3}
              id={id+3}
              // handleOver={handleOver}
              // handleOut={handleOut}
              handleClick={() => handleClick(id+3)}
              pokemon={pokemon}
              isShiny={isShiny}
              selectedTeam={selectedTeam}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PokeTeam;
