import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_OMDB_KEY;

function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLOading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLOading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            {
              signal: controller.signal,
            }
          );

          if (!res.ok)
            throw new Error("Somethng went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movies Not Found");

          setMovies(data);
          setError("");
        } catch (err) {
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
