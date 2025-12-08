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

// ---- Типи відповіді ----
interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface TrendingResponse {
  results: Movie[];
}

interface MovieDetails extends Movie {
  overview: string;
  genres: { id: number; name: string }[];
}

interface CreditsResponse {
  cast: { name: string; character: string; profile_path: string | null }[];
}

interface ReviewsResponse {
  results: {
    author: string;
    content: string;
    id: string;
  }[];
}




export async function searchMovies(query: string): Promise<Movie[]> {
  const { data } = await api.get<SearchResponse>(`/search/movie`, {
    params: { query, include_adult: false },
  });
  return data.results;
}


export async function getTrendingMovies(): Promise<Movie[]> {
  const { data } = await api.get<TrendingResponse>(`/trending/movie/day`);
  return data.results;
}


export async function getMovieDetails(movieId: string): Promise<MovieDetails> {
  const { data } = await api.get<MovieDetails>(`/movie/${movieId}`);
  return data;
}


export async function getMovieCredits(movieId: string) {
  const { data } = await api.get<CreditsResponse>(`/movie/${movieId}/credits`);
  return data.cast;
}


export async function getMovieReviews(movieId: string) {
  const { data } = await api.get<ReviewsResponse>(`/movie/${movieId}/reviews`);
  return data.results;
}
