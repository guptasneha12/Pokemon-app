import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            name: pokemonDetails.data.name,
            image: pokemonDetails.data.sprites.front_default,
          };
        })
      );
      setPokemonList(pokemonData);
      setFilteredPokemon(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(value)
    );
    setFilteredPokemon(filtered);
  };

  return (
    <div className="app">
      <h1>Pokémon Search</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
};

export default App;
