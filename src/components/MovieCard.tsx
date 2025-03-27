import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
}

export default function MovieCard({ id, title, posterPath }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`} className="cursor-pointer">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="rounded-md"
        />
        <h3 className="mt-2 text-sm font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
  