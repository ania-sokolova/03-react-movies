import type { Movie } from "../../types/movie";   
import css from "./MovieGrid.module.css";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: Props) {
  if (!movies.length) return null;

  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div className={css.card} onClick={() => onSelect(movie)}>
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-image.jpg" 
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
