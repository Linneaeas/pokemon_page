import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";

function App() {
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]);

  useEffect(() => {}, []);

  axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
    setPokemon(res.data.results.map((p) => p.name));
  });

  return <PokemonList pokemon={pokemon} />;
}

export default App;
