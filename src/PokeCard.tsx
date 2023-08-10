import { Pokemon } from "./Pokedex";

function PokeCard(props: {
  pokemon: Pokemon;
  isShiny: boolean;
  // handleOver: React.MouseEventHandler<HTMLImageElement>;
  // handleOut: React.MouseEventHandler<HTMLImageElement>;
  handleClick: React.MouseEventHandler<HTMLImageElement>;
}) {
  const { pokemon, isShiny, handleClick } = props;
  return (
    <img
      // onMouseOver={handleOver}
      // onMouseOut={handleOut}
      onClick={handleClick}
      className="pokeCard"
      alt={pokemon.name}
      width="80px"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
        isShiny ? "shiny" : ""
      }/${pokemon.id}.png`}
      // src={`https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/${
      //   isShiny ? "shiny" : "regular"
      // }/${pokemon.name}.png`}
    />
  );
}

export default PokeCard;
