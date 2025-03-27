import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
        />
      ))}
    </div>
  );
}
