"use client";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    return (
        <div className="flex justify-center space-x-2">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-3 py-1 bg-gray-300 rounded ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-400"
                }`}
            >
                Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
                }`}
                >
                {i + 1}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-3 py-1 bg-gray-300 rounded ${
                currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-400"
                }`}
            >
                Next
            </button>
        </div>
    );
}
