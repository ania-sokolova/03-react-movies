import { useState } from "react";
import toast from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { searchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await searchMovies(query);

      if (results.length === 0) {
        toast("No movies found for your request.", { icon: "⚠️" });
      }

      setMovies(results);
    } catch {
      setError(true);
      toast.error("Request failed! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}
      {error && !loading && <ErrorMessage />}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}


