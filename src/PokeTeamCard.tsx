import { Pokemon } from "./Pokedex";
import PokeCard from "./PokeCard";

function PokeTeamCard(props: {
  id: number;
  pokemon: Pokemon | null;
  isShiny: boolean;
  selectedTeam: (Pokemon | null)[];
  // handleOver: React.MouseEventHandler<HTMLImageElement>;
  // handleOut: React.MouseEventHandler<HTMLImageElement>;
  handleClick: React.MouseEventHandler<HTMLImageElement>;
}) {
  const { id, pokemon, isShiny, handleClick } = props;
  console.log(pokemon);
  if (pokemon !== null) {
    return (
      <div className="pokeTeamCard">
        <PokeCard
          key={id}
          // handleOver={handleOver}
          // handleOut={handleOut}
          handleClick={handleClick}
          pokemon={pokemon}
          isShiny={isShiny}
        />
      </div>
    );
  } else {
    return (
      <div className="pokeTeamCard">
      </div>
    );
  }
}

export default PokeTeamCard;
