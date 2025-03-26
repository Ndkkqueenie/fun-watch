"use client";

import { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MovieList from "@/components/MovieList";
import ErrorMessage from "@/components/ErrorMessage";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const searchMovies = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query },
      });
      setMovies(response.data.results);
    } catch (err) {
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

        {/* Loading State */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Display Search Results */}
        <MovieList movies={movies} />
      </main>
    </div>
  );
}
