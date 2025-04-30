import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onResetSearch,
  isLoading
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
        Search Advocates
      </label>
      <div className="relative">
        <input
          id="search"
          type="text"
          className="w-full md:max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search by name, city, degree..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={onResetSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      {isLoading && (
        <p className="mt-2 text-sm text-gray-500">Searching...</p>
      )}
    </div>
  );
};

export default SearchBar;
