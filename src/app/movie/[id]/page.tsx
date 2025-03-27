"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
}

interface Recommendation {
  id: number;
  title: string;
  poster_path: string;
}

export default function MovieDetails() {
  const { id } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState("synopsis");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRes = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY },
        });

        const castRes = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
          params: { api_key: API_KEY },
        });

        const reviewsRes = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
          params: { api_key: API_KEY },
        });

        const recommendationsRes = await axios.get(
          `${BASE_URL}/movie/${id}/recommendations`,
          { params: { api_key: API_KEY } }
        );

        setMovie(movieRes.data);
        setCast(castRes.data.cast.slice(0, 6)); // Only show top 6 cast members
        setReviews(reviewsRes.data.results.slice(0, 3)); // Limit to 3 reviews
        setRecommendations(recommendationsRes.data.results.slice(0, 6)); // 6 recommendations
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full max-w-md rounded-lg"
      />

      {/* Tab Links */}
      <div className="flex gap-4 mt-6 border-b border-gray-700">
        {["synopsis", "cast", "reviews", "recommendations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 text-lg ${
              activeTab === tab ? "border-b-2 border-white font-bold" : "text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "synopsis" && (
          <div>
            <p className="text-lg">{movie.overview}</p>
            <p className="mt-2 text-gray-400">⭐ {movie.vote_average.toFixed(1)} / 10</p>
          </div>
        )}

        {activeTab === "cast" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cast.map((member) => (
              <div key={member.id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  className="rounded-md"
                />
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-400">{member.character}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-sm text-gray-400">{review.content.substring(0, 200)}...</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews available.</p>
            )}
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                  alt={rec.title}
                  className="rounded-md"
                />
                <p className="font-semibold">{rec.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
