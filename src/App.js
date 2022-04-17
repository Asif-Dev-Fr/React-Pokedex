import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import PokemonList from "./components/PokemonList";
import Header from "./components/Header";

const App = () => {
  let API_KEY = "https://pokeapi.co/api/v2/pokemon?limit=30";

  const [result, setResult] = useState([]);
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);
  const [moreDataHasBeenLoaded, setMoreDataHasBeenLoaded] = useState(false);
  const [singleResult, setSingleResult] = useState({});

  const loadMore = () => {
    console.log("clicked");
    if (!!next) {
      setMoreDataHasBeenLoaded(true);
      fetchInitialData();
      // Go top of the page
      window.scrollTo(0, 0);
    }
  };

  const reset = () => {
    setNext("");
    setResult([]);
    setMoreDataHasBeenLoaded(false);
    setSingleResult({});
    fetchInitialData("resetData");
  };

  const findSinglePokemon = async (name) => {
    console.log(name);
    if (!!name) {
      let res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      console.log(res.data);
      setSingleResult(res.data);
    }
  };

  const fetchInitialData = async (reset) => {
    try {
      setLoading(true);
      // Get the list of the first 30 pokemon
      let response = await axios({
        url: reset === "resetData" ? API_KEY : next ? next : API_KEY,
        method: "GET",
      });
      let pokemons = response.data.results;
      console.log(response.data);
      setNext(response.data.next);
      fetchEachPokemonDetails(pokemons);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchEachPokemonDetails = async (pokemons) => {
    let newArray = [];
    // Fetch data for each pokemon
    for (let pokemon of pokemons) {
      let res = await axios({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        method: "GET",
      });
      let data = res.data;
      // Add 30 each time to the end to the array
      setResult((prevArray) => [...prevArray, data]);

      // Limit 30 per page :
      // newArray.push(data);
      // if (newArray.length >= 30) {
      //   setResult(newArray);
      // }
    }
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <PokemonList
                  pokemon={result}
                  singlePokemon={singleResult}
                  loadMore={loadMore}
                  reset={reset}
                  findSinglePokemon={findSinglePokemon}
                  loading={loading}
                  moreDataHasBeenLoaded={moreDataHasBeenLoaded}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
