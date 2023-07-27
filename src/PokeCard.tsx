import { Pokemon } from "./Pokedex";

function PokeCard(props : {key: number, pokemon: Pokemon, isShiny: boolean}) { 
    
    const pokemon = props.pokemon;
    const isShiny = props.isShiny;
    if (isShiny) {
        return (
            <img className="pokeCard" alt={pokemon.name} height="60px" src={"https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/shiny/" + pokemon.name + ".png"}/>
        )
    }
    return (
       <img className="pokeCard" alt={pokemon.name} height="60px" src={"https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/regular/" + pokemon.name + ".png"}/>
    )
}

export default PokeCard;