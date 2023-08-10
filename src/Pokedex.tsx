import React, { useState } from "react";
import PokeTypeButton from "./PokeTypeButton";
import PokeGrid from "./PokeGrid";
import PokeGenButton from "./PokeGenButton";
import { useQuery, gql } from "@apollo/client";
import PokeTeam from "./PokeTeam";

enum PokeTypes {
  normal = 1,
  fighting = 2,
  flying = 3,
  poison = 4,
  ground = 5,
  rock = 6,
  bug = 7,
  ghost = 8,
  steel = 9,
  fire = 10,
  water = 11,
  grass = 12,
  electric = 13,
  psychic = 14,
  ice = 15,
  dragon = 16,
  dark = 17,
  fairy = 18,
}

enum Generations {
  gen1 = 1,
  gen2 = 2,
  gen3 = 3,
  gen4 = 4,
  gen5 = 5,
  gen6 = 6,
  gen7 = 7,
  gen8 = 8,
}

// export const jpNames: Record<number, string> = {};
export type PokeType = keyof typeof PokeTypes;
export type Pokemon = {
  type: PokeType;
  generation_id: number;
  name: string;
  id: number;
};
export type PokeEfficacy = {
  damage_factor: number;
  damage_type_id: number;
  target_type_id: number;
};
export type TypeInfo = {
  attack: Set<PokeEfficacy>;
  defense: Set<PokeEfficacy>;
};
export const TypeChart: Record<number, TypeInfo> = {};

// export type JpName = {
//   name: string;
//   pokemon_species_id: number;
//   language_id: number;
// };

// function generateCursorInfo() {
//   return gql`
//     query samplePokeAPIquery {
//       pokemon_v2_pokemonspeciesname(where: { language_id: { _eq: 1 } }) {
//         name
//         pokemon_species_id
//         language_id
//       }
//     }
//   `;
// }

function generateTypeAdvantages() {
  return gql`
    query samplePokeAPIquery {
      pokemon_v2_typeefficacy {
        damage_factor
        damage_type_id
        target_type_id
      }
    }
  `;
}

function Pokedex() {
  const [typeFilter, setTypeFilter] = useState(new Set<PokeType>());
  const [genFilter, setGenFilter] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState(0);
  const [isShiny, setShiny] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTeam, setSelectedTeam] = useState([null, null, null, null, null, null] as (Pokemon|null)[] );
  const [availableSlots, setAvailableSlots] = useState([1, 2, 3, 4, 5, 6]);

  // load cursor details
  // const cursorQuery = generateCursorInfo();
  // const { loading, error, data } = useQuery(cursorQuery);
  // if (loading) return;
  // if (error) return;

  // for (let id = 1; id < 810; ++id) {
  //   const jpName = data.pokemon_v2_pokemonspeciesname.filter(
  //     (jpName: JpName) => jpName.pokemon_species_id === id
  //   );
  //   jpNames[id] = jpName[0].name;
  // }
  // console.log(jpNames);

  // load type advantages
  const typeAdvantageQuery = generateTypeAdvantages();
  const { loading, error, data } = useQuery(typeAdvantageQuery);
  if (loading) return;
  if (error) return;

  for (let typeEfficacy of data.pokemon_v2_typeefficacy) {
    // add attack efficacy to attacker
    if (typeEfficacy.damage_type_id in TypeChart) {
      TypeChart[typeEfficacy.damage_type_id].attack.add(typeEfficacy);
    } else {
      TypeChart[typeEfficacy.damage_type_id] = {
        attack: new Set<PokeEfficacy>([typeEfficacy]),
        defense: new Set<PokeEfficacy>(),
      };
    }
    // add defense efficacy to defender
    if (typeEfficacy.target_type_id in TypeChart) {
      TypeChart[typeEfficacy.target_type_id].defense.add(typeEfficacy);
    } else {
      TypeChart[typeEfficacy.damage_type_id] = {
        attack: new Set<PokeEfficacy>(),
        defense: new Set<PokeEfficacy>([typeEfficacy]),
      };
    }
  }

  // handlers
  const handleShinyToggle = () => {
    setShiny((prev) => !prev);
  };

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (Number(value)) {
      setIdFilter(Number(value));
      setNameFilter("");
    } else {
      setNameFilter(".*" + value + ".*");
      setIdFilter(0);
    }
    setSearchValue(value);
  };

  return (
    <div className="dex">
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
        {/* <div id="jpName">
          <h1>{selectedPokemon === 0 ? "  " : jpNames[selectedPokemon]}</h1>
        </div> */}
      </div>
      <PokeGrid
        types={typeFilter}
        gen={genFilter}
        name={nameFilter}
        id={idFilter}
        isShiny={isShiny}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        availableSlots={availableSlots}
        setAvailableSlots={setAvailableSlots}
      />
      <div className="teamViewer">
        <PokeTeam
          isShiny={isShiny}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          availableSlots={availableSlots}
          setAvailableSlots={setAvailableSlots}
        />
      </div>
    </div>
  );
}

export default Pokedex;
