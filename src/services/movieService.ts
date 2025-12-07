import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN; 

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Request error");
  }

  const data = await response.json();
  return data.results ?? []; 
}