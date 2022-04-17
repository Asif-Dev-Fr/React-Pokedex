import React, { useEffect, useState } from "react";
import sword from "../assets/images/sword.png";
import shield from "../assets/images/shield.png";
import heart from "../assets/images/heart.png";
import { pokemonElement } from "./PokemonElement";

const PokemonCard = ({ pokemon }) => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonStype, setPokemonType] = useState("");

  const setInitialData = () => {
    setPokemonName(pokemon.name.toUpperCase());
    setPokemonType(pokemon.types[0].type.name.toUpperCase());
  };

  useEffect(() => {
    setInitialData();
  });

  return (
    <div
      className="pokemonCard col-12 col-lg-3 col-md-4"
      style={{ border: "10px solid " + pokemonElement(pokemonStype) }}
    >
      <a href={"https://www.pokemon.com/us/pokedex/" + pokemon.name} target="_blank" rel="noreferrer">
        <img
          className="pokemonImg"
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
      </a>
      <div className="pokemonName font">{pokemonName}</div>
      <div className="pokemonStat">
        <div className="d-flex justify-content-between">
          <div>
            <img className="icons" src={heart} alt="heart" />
            <span
              className="font"
              style={{ marginLeft: 10, fontSize: 20, paddingTop: 20 }}
            >
              {pokemon.stats[0].base_stat}
            </span>
          </div>
          <div>
            <img className="icons" src={sword} alt="sword" />
            <span className="font" style={{ marginLeft: 10, fontSize: 20 }}>
              {pokemon.stats[1].base_stat}
            </span>
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ marginTop: 15 }}
        >
          <div>
            <img className="icons" src={shield} alt="shield" />
            <span
              className="font"
              style={{ marginLeft: 10, fontSize: 20, paddingTop: 20 }}
            >
              {pokemon.stats[2].base_stat}
            </span>
          </div>
          <div>
            <span style={{ color: pokemonElement(pokemonStype) }}>
              {pokemonStype}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
