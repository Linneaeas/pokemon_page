import "./App.css";
import React, { useState, useEffect } from "react"; // Imports necessary React components and hooks.
import PokemonList from "./PokemonList";
import axios from "axios"; // Imports the Axios library for making HTTP requests.
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]); // Initializes a state variable "pokemon" using the useState hook, and sets its initial value as an empty array.
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  ); // Initializes a state variable "currentPageUrl" with the initial value as the URL of the first page of the PokeAPI.
  const [nextPageUrl, setNextPageUrl] = useState(); // Initializes a state variable "nextPageUrl" with no initial value.
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true); // Initializes a state variable "loading" with the initial value as "true".

  useEffect(() => {
    setLoading(true); // Sets the "loading" state to true when the effect starts.
    let cancel; // Initializes a cancel token.
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      }) // Makes an HTTP GET request to the current page URL using Axios. Also sets up a cancel token to abort the request if needed.
      .then((res) => {
        setLoading(false); // Sets the "loading" state to false when the response is received.
        setNextPageUrl(res.data.next); // Updates the "nextPageUrl" state with the URL of the next page from the API response.
        setPrevPageUrl(res.data.previous); // Updates the "prevPageUrl" state with the URL of the previous page from the API response.
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => cancel(); // Returns a cleanup function that cancels the ongoing Axios request if the effect is re-run or unmounted.
  }, [currentPageUrl]); // The effect runs whenever "currentPageUrl" changes.

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl); // Updates the "currentPageUrl" state with the URL of the next page, triggering a re-render and fetching new data.
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
/* return (
 <>
    <PokemonList pokemon={pokemon} /> // Renders the "PokemonList" component and passes the "pokemon" state as a prop.
    <Pagination
      gotoNextPage={nextPageUrl ? gotoNextPage : null}
      gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
    /> // Renders the "Pagination" component and passes the "gotoNextPage" and "gotoPrevPage" functions as props.
  </>
);
} */
