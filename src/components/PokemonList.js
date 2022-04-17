import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = (props) => {
  console.log(props.pokemon);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!!name) {
      props.findSinglePokemon(name);
      setName("");
    } else setError(true);
  };

  return (
    <React.Fragment>
      <form onSubmit={submit} className="form">
        <input
          value={name}
          placeholder="Find a pokemon"
          onChange={(e) => setName(e.target.value)}
          style={error === true ? { border: "1px solid red" } : {}}
        />
        <button className="btn btn-dark">Search</button>
      </form>

      <div className="row justify-content-center">
        {Object.keys(props.singlePokemon).length !== 0 ? (
          <PokemonCard
            key={props.singlePokemon.id}
            pokemon={props.singlePokemon}
          />
        ) : (
          props.pokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>
      {Object.keys(props.singlePokemon).length === 0 ? (
        <div className="mb-4 mt-2">
          <button
            className="btn btn-dark "
            style={{ width: 200 }}
            onClick={props.loadMore}
            disabled={props.loading === true ? true : false}
          >
            {props.loading === false ? "Load more" : "Loading"}
          </button>
        </div>
      ) : (
        ""
      )}
      {props.moreDataHasBeenLoaded === true ||
      Object.keys(props.singlePokemon).length !== 0 ? (
        <div>
          <button
            className="btn btn-secondary my-4"
            style={{ width: 200 }}
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default PokemonList;
