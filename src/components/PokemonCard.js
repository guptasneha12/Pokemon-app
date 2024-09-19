import React from 'react';


const PokemonCard = ({ name, image }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default PokemonCard;
