import { useQuery, gql } from "@apollo/client";
import PokeCard from "./PokeCard";
import { PokeType, Pokemon } from "./Pokedex";

const style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  columnGap: '0px', 
  rowGap: '0px'
}
  
function generateQuery(
  types: Set<PokeType>,
  gen: number,
  name: string,
  id: number
) {
  const typeIter = types.entries();
  const QUERY_BY_TYPE =
    types.size === 0
      ? ``
      : types.size === 1
      ? `pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: ${
          typeIter.next().value[0]
        }}}}`
      : `pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: ${
          typeIter.next().value[0]
        }}}}, _and: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: ${
          typeIter.next().value[0]
        }}}}} `;
  const QUERY_BY_GEN = gen === 0 ? `` : `generation_id: {_eq: ${gen}}`;
  const QUERY_BY_NAME = name === "" ? `` : `name: {_regex : "${name}"}`;
  console.log(QUERY_BY_NAME);
  const QUERY_BY_ID = id === 0 ? `` : `id : {_eq : ${id}}`;

  return gql`query samplePokeAPIquery {
        pokemon_v2_pokemonspecies(where: {${QUERY_BY_GEN}, pokemon_v2_pokemons: {${QUERY_BY_TYPE}, is_default: {_eq: true}}, ${QUERY_BY_NAME}, ${QUERY_BY_ID}}, order_by: {id: asc}) {
            name
            id
            generation_id
        }
    }  
  `;
}

function PokeGrid(props: {
  types: Set<PokeType>;
  gen: number;
  name: string;
  id: number;
  isShiny: boolean;
}) {

  const { types, gen, name, id, isShiny} = props;
  const GET_POKEMON = generateQuery(types, gen, name, id);

  const { loading, error, data } = useQuery(GET_POKEMON);
  if (loading) return;
  if (error) return;

  return (
    <div className="pokeGrid">
      {data.pokemon_v2_pokemonspecies
        .filter((pokemon: Pokemon) => pokemon.generation_id < 8)
        .map((pokemon: Pokemon) => (
          <PokeCard  key={pokemon.id} pokemon={pokemon} isShiny={isShiny} />
        ))}
    </div>
  );
}

export default PokeGrid;
