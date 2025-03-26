interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
  }
  
  export default function Pagination({ page, setPage }: PaginationProps) {
    return (
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    );
  }    
  