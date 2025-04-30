"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";
import { Advocate } from "../models/Advocate";
import { AdvocatesApiResponse, PaginationState } from "../models/ApiResponse";
import SearchBar from "../components/SearchBar";
import AdvocatesTable from "../components/AdvocatesTable";
import Pagination from "../components/Pagination";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentSearchTerm = searchParams.get('search') || '';
  
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    page: currentPage,
    pageSize: 10,
    totalPages: 0
  });

  const fetchAdvocates = useCallback(async (search: string, page: number) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      params.set('page', page.toString());
      params.set('pageSize', pagination.pageSize.toString());
      
      const response = await fetch(`/api/advocates?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const jsonResponse: AdvocatesApiResponse = await response.json();
      
      setAdvocates(jsonResponse.data);
      setPagination(jsonResponse.pagination);
    } catch (error) {
      console.error("Error fetching advocates:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageSize]);
  
  useEffect(() => {

    const searchParams = new URLSearchParams();
    if (debouncedSearchTerm) searchParams.set('search', debouncedSearchTerm);
    searchParams.set('page', '1');
    
    router.push(`/?${searchParams.toString()}`, { scroll: false });
    
  
    fetchAdvocates(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm, fetchAdvocates, router]);
  

  useEffect(() => {
    if (currentSearchTerm === debouncedSearchTerm) {
      fetchAdvocates(currentSearchTerm, currentPage);
    }
  }, [currentPage, currentSearchTerm, debouncedSearchTerm, fetchAdvocates]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', newPage.toString());
    
    router.push(`/?${params.toString()}`, { scroll: false });
  };
  
  const resetSearch = () => {
    setSearchTerm("");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Solace Advocates</h1>
        <p className="text-lg text-gray-600">Find legal professionals specialized in various fields</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onResetSearch={resetSearch}
            isLoading={isLoading}
          />
        </div>
        
        {!isLoading && advocates.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No advocates found. Try adjusting your search criteria.
          </div>
        ) : (
          <AdvocatesTable 
            advocates={advocates} 
            totalCount={pagination.total} 
          />
        )}
        
        <Pagination 
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
