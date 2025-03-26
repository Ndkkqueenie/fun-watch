interface MovieCardProps {
    title: string;
    posterPath: string;
  }
  
  export default function MovieCard({ title, posterPath }: MovieCardProps) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="rounded-md"
        />
        <h3 className="mt-2 text-sm font-semibold">{title}</h3>
      </div>
    );
  }
  