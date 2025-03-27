"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MovieList from "@/components/MovieList";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchActive, setSearchActive] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // Fetch Trending Movies (runs on page load)
  useEffect(() => {
    fetchTrendingMovies(page);
  }, [page]);

  const fetchTrendingMovies = async (page: number) => {
    setLoading(true);
    setError(null);
    setSearchActive(false); // Reset search mode

    try {
      const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
        params: { api_key: API_KEY, page },
      });
      setMovies(response.data.results.slice(0, 9)); // Only show 10 movies
    } catch (err) {
      setError("Failed to load trending movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Search Movies
  const searchMovies = async (query: string) => {
    setLoading(true);
    setError(null);
    setSearchActive(true); // User has searched

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query, page: 1 },
      });
      setMovies(response.data.results);
    } catch {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <Header />
        <SearchBar onSearch={searchMovies} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        <h2 className="text-lg font-semibold mt-4">
          {searchActive ? "Search Results" : "Trending Movies"}
        </h2>
        <MovieList movies={movies} />
        {!searchActive && <Pagination page={page} setPage={setPage} />}
      </main>
    </div>
  );
}
