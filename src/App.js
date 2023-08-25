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

/* AXIOS 
axios is a popular JavaScript library that is used to make HTTP requests from a web browser or a Node.js server. It provides a simple and convenient way to send and receive data from APIs or servers. Axios supports various features like handling request and response headers, data transformation, request cancellation, and more.

The primary advantage of using axios over the traditional fetch API is that axios provides a more consistent and user-friendly API for making HTTP requests. Here are some differences between axios and the native fetch API:

Syntax and Convenience: Axios provides a more concise and intuitive syntax compared to the fetch API. With axios, you can make requests using simple function calls, while the fetch API requires you to construct the request and handle the response using separate methods.

Global Configuration: Axios allows you to set up global configurations, such as default headers and request/response interceptors, which can be handy for managing common behaviors across multiple requests.

Request and Response Interceptors: Axios provides interceptors that allow you to globally intercept and modify requests and responses. This can be useful for tasks like adding authentication headers or handling errors.

Cancellation: Axios allows you to cancel requests using cancel tokens, which can be helpful when dealing with scenarios like users navigating away from a page while a request is still in progress. The fetch API does not have built-in cancellation support.

Response Transformation: Axios lets you define response transformers to preprocess the data received from the server. This can be useful for parsing data formats like JSON or XML.

Error Handling: While both libraries allow you to handle errors, Axios offers a more standardized way to define error handling for multiple requests by using interceptors.

In summary, while both axios and the fetch API can accomplish similar tasks, axios offers more features and a more developer-friendly interface for handling HTTP requests and responses. The choice between the two depends on your specific needs and preferences.
*/
