import { Suspense } from "react";
import ClientPage from "../components/ClientPage";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Solace Advocates</h1>
        <p className="text-lg text-gray-600">Find legal professionals specialized in various fields</p>
      </div>
      
      <Suspense fallback={
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      }>
        <ClientPage />
      </Suspense>
    </main>
  );
}
