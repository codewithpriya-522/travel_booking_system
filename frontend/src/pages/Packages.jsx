import React, { useState, useEffect } from 'react';
import { packageService } from '../services/api';
import PackageCard from '../components/common/PackageCard';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const limit = 6;

  useEffect(() => {
    fetchPackages();
  }, [searchTerm, sort, page]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await packageService.getAll({
        search: searchTerm,
        sort,
        page,
        limit
      });
      setPackages(response.data.data.packages);
      setTotalResults(response.data.results);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className="py-[50px] bg-bg min-h-[80vh]">
      <div className="max-w-[1200px] mx-auto px-5">
        <h1 className="text-center mb-10 text-dark text-4xl font-bold">Our Travel Packages</h1>
        
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-5">
          <input 
            type="text" 
            placeholder="Search packages..." 
            value={searchTerm}
            onChange={handleSearch}
            className="flex-grow p-3 border border-[#ddd] rounded-md text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
          <select value={sort} onChange={handleSort} className="p-3 border border-[#ddd] rounded-md text-base bg-white cursor-pointer outline-none">
            <option value="-createdAt">Newest First</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="title">Name: A-Z</option>
          </select>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
          {loading ? (
            <p>Loading...</p>
          ) : (
            packages.length > 0 ? (
              packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)
            ) : (
              <p>No packages found.</p>
            )
          )}
        </div>

        <div className="flex justify-center items-center gap-5 mt-[50px]">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            className="px-5 py-2.5 bg-primary text-white border-none rounded-md cursor-pointer transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="font-bold text-dark">Page {page}</span>
          <button 
            disabled={packages.length < limit} 
            onClick={() => setPage(page + 1)}
            className="px-5 py-2.5 bg-primary text-white border-none rounded-md cursor-pointer transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
