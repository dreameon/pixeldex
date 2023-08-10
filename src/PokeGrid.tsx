import { useQuery, gql } from "@apollo/client";
import PokeCard from "./PokeCard";
import { PokeType, Pokemon } from "./Pokedex";
import React, { useState } from "react";

const style: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  columnGap: "0px",
  rowGap: "0px",
};

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

//
// pokemon_v2_evolutionchain {
//   pokemon_v2_pokemonspecies {
//     id
//   }
// }

function PokeGrid(props: {
  types: Set<PokeType>;
  gen: number;
  name: string;
  id: number;
  isShiny: boolean;
  selectedTeam: (Pokemon | null)[];
  setSelectedTeam: React.Dispatch<React.SetStateAction<(Pokemon | null)[]>>;
  availableSlots: number[];
  setAvailableSlots: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const {
    types,
    gen,
    name,
    id,
    isShiny,
    selectedTeam,
    setSelectedTeam,
    availableSlots,
    setAvailableSlots,
  } = props;
  const GET_POKEMON = generateQuery(types, gen, name, id);
  const { loading, error, data } = useQuery(GET_POKEMON);

  return (
    <div className="pokeGrid">
      {!loading &&
        !error &&
        data.pokemon_v2_pokemonspecies
          .filter((pokemon: Pokemon) => pokemon.generation_id < 9)
          .map((pokemon: Pokemon) => {
            // const handleOver = () => setSelectedPokemon(pokemon.id);
            // const handleOut = () => setSelectedPokemon(0);
            const handleClick = () => {
              if (selectedTeam.includes(null)) {
                const index = selectedTeam.indexOf(null);
                setSelectedTeam((prev) => {
                  const newTeam = [...prev];
                  newTeam[index] = pokemon;
                  return newTeam;
                });
                console.log(selectedTeam);
                // {
                //   const newSelectedTeam = [...prev];
                //   console.log(availableSlots);
                //   newSelectedTeam[availableSlots[0]] = pokemon;
                //   // console.log(selectedTeam);
                //   return newSelectedTeam;
                // });

                // const newSlots = availableSlots;
                // newSlots.sort();
                // newSlots.shift();
                // setAvailableSlots(newSlots);
              }
            };
            return (
              <div className="pokeCardWrapper">
                <PokeCard
                  // handleOver={handleOver}
                  // handleOut={handleOut}
                  handleClick={handleClick}
                  key={pokemon.id}
                  pokemon={pokemon}
                  isShiny={isShiny}
                />
              </div>
            );
          })}
    </div>
  );
}

export default PokeGrid;
