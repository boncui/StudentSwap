import React, {useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from '../components/Sublease/GoogleMap';

interface Sublease {
    _id: string;
    title: string;
    monthlyRent: number;
    rooms: 'studio' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    baths: 'shower' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    features?: {
        washer?: boolean;
        dryer?: boolean;
        parking?: boolean | string;
        furnished?: boolean;
        gym?: boolean;
        amenities?: string[];
        petsAllowed?: boolean;
    };
    photos?: string[];
    description?: string;
    location: string;
}

const SubleasePage:React.FC = () => {
    const [subleases, setSubleases] = useState<Sublease[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const fetchSubleases = async (page: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5001/api/housing-contracts', {
                params: { isSublease: true, page, limit: 6 }, // Fetch 6 subleases per page
            });

            const { contracts, totalPages } = response.data;
            setSubleases(contracts || []);
            setTotalPages(totalPages || 1);
        } catch (err) {
            setError('Failed to fetch sublease data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubleases(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    return (
        <div className="flex h-screen">
            {/* Left: Map */}
            <div className="w-1/2 border-r">
                <div className="h-full">
                    <MapComponent />
                </div>
            </div>

            {/* Right: Sublease Listings */}
            <div className="w-1/2">
                {/* Filters and Sorting */}
                <div className="p-4 bg-white border-b shadow">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <button className="border px-4 py-2 rounded hover:bg-gray-100">Beds</button>
                            <button className="border px-4 py-2 rounded hover:bg-gray-100">Baths</button>
                            <button className="border px-4 py-2 rounded hover:bg-gray-100">Price</button>
                            <button className="border px-4 py-2 rounded hover:bg-gray-100">Sort</button>
                        </div>
                        <button className="border px-4 py-2 rounded hover:bg-gray-100">More Filters</button>
                    </div>
                </div>

                {/* Sublease Listings */}
                <div className="p-4">
                    {loading && <p>Loading sublease listings...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-2 gap-4">
                        {subleases.map((sublease) => (
                            <div key={sublease._id} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                                <img
                                    src={sublease.photos && sublease.photos.length > 0 ? sublease.photos[0] : 'https://via.placeholder.com/150'}
                                    alt={sublease.title}
                                    className="w-full h-32 object-cover rounded mb-2"
                                />
                                <h2 className="font-bold text-lg">{sublease.title}</h2>
                                <p>${sublease.monthlyRent} / month</p>
                                <p>
                                    {sublease.rooms} Room{Number(sublease.rooms) > 1 ? 's' : ''}, {' '}
                                    {sublease.baths} Bath{Number(sublease.baths) > 1 ? 's' : ''}
                                </p>
                                {sublease.description && <p className="text-sm text-gray-600">{sublease.description}</p>}
                                {sublease.features?.furnished && <p>Furnished</p>}
                                {sublease.features?.washer && <p>Washer Available</p>}
                                {sublease.features?.dryer && <p>Dryer Available</p>}
                                {sublease.features?.petsAllowed && <p>Pets Allowed</p>}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <p>
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubleasePage;