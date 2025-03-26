"use client";

import { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const searchMovies = async () => {
    if (!query.trim()) return;
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
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full sm:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Search Button */}
          <button
            onClick={searchMovies}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {/* Loading State */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Search Results */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 text-white p-4 rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md"
              />
              <h3 className="mt-2 text-sm font-semibold">{movie.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
