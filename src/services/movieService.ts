import axios from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;


const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
});


interface SearchResponse {
  page: number;
  results: Movie[];         
  total_pages: number;
  total_results: number;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const { data } = await api.get<SearchResponse>(`/search/movie`, {
    params: { query, include_adult: false },
  });

  return data.results; 
}
