import { useState } from 'react';
import axios from 'axios';
import "./App.css";

const App = () =>  {
  const [pokemonName, setPokemonName] = useState('');
  const [chosen, setChosen] = useState(false);
  const [pokemon, setPokemon] = useState({});

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon({
          name: response.data.name,
          img: response.data.sprites.other.dream_world.front_default,
          type: response.data.types[0].type.name,
          weight: response.data.weight,
          height: response.data.height,
          // moves,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialAttack: response.data.stats[3].base_stat,
          specialDefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
        })
        setChosen(true);
      })
  }

  return (
    <div className="App">
      <div className="title">
        <h1><img src="https://fontmeme.com/permalink/210530/ef80778d070dbd0706f3691e265dde0a.png" alt="pokemon stats" /></h1>
        <input type="text" onChange={(e) => setPokemonName(e.target.value)} />
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className="display">
        {
          !chosen ? <h1>Please enter a pokemon name</h1> :
          (
            <div className={`card ${pokemon.type}`}>
              <h1>{pokemon.name}</h1>
              <img src={pokemon.img} alt="searched pokemon" />
              <p><span>Type:</span> {pokemon.type.toUpperCase()}</p>
              <p><span>Weight:</span> {(pokemon.weight * 100) / 1000}kg</p>
              <p><span>Height:</span> {pokemon.height * 10}cm</p>
              <p><span>Hp:</span> {pokemon.hp}</p>
              <p><span>Attack:</span> {pokemon.attack}</p>
              <p><span>Defense:</span> {pokemon.defense}</p>
              <p><span>Special Attack:</span> {pokemon.specialAttack}</p>
              <p><span>Special Defense:</span> {pokemon.specialDefense}</p>
              <p><span>Speed:</span> {pokemon.speed}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
