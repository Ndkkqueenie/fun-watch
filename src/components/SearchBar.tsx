import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full sm:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}
