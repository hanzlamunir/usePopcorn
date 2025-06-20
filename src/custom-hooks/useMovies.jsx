import { useState, useEffect } from "react";

const KEY = "44119da2";

// function useMovies(query, callback) {
function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLOading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //   callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLOading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            {
              signal: controller.signal,
            }
          );

          if (!res.ok)
            throw new Error("Somethng went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movies Not Found");

          //   setMovies(data.Search);
          setMovies(data);
          setError("");
        } catch (err) {
          // console.error(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLOading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}

export default useMovies;
