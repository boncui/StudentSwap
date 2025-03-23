import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


// Use environment variable as base URL; fallback to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
// ${baseURL}

interface Contract {
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
    description?: string;
    location: string;
    postedBy?: { _id: string; email: string };
}

const ContractsPage: React.FC = () => {
    const { user } = useAuth();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [revealedEmails, setRevealedEmails] = useState<{ [contractId: string]: boolean }>({});
    const [likedListings, setLikedListings] = useState<string[]>([]);

    
    const fetchContracts = async (page: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${baseURL}/api/housing-contracts`, {
                params: { page, limit: 7 }, // Fetch 6 contracts per page
            });

            const { contracts, totalPages } = response.data;
            setContracts(contracts || []);
            setTotalPages(totalPages || 1);
        } catch (err) {
            setError('Failed to fetch contract data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContracts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (user) {
            axios.get(`${baseURL}/api/users/${user._id}/liked-listings`)
            .then(res => {
                const ids = res.data.map((listing: any) =>
                typeof listing === 'string' ? listing : listing._id.toString()
                );
                setLikedListings(ids);
            })
            .catch(() => setLikedListings([]));
        }
    }, [user]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleRevealEmail = (contractId: string) => {
        setRevealedEmails(prev => ({ ...prev, [contractId]: true }));
    
        setTimeout(() => {
            setRevealedEmails(prev => {
              const updated = { ...prev };
              delete updated[contractId];
              return updated;
            });
          }, 5000);
        };

          
    const toggleLike = async (listingId: string) => {
        try {
            const stringId = listingId.toString();
            const isLiked = likedListings.includes(stringId);
            const url = `${baseURL}/api/users/${user._id}/liked-listings`;
            const method = isLiked ? 'delete' : 'post';
        
            await axios({
            method,
            url,
            data: { listingId: stringId },
            });
        
            setLikedListings(prev =>
            isLiked ? prev.filter(id => id !== stringId) : [...prev, stringId]
            );
        } catch (err) {
            console.error('Error updating like status', err);
        }
        };
          


    

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4">

            <h2 className="text-2xl font-bold text-center mb-4">Available Contracts</h2>

            {loading && <p className="text-center">Loading contract listings...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && contracts.length === 0 && (
                <p className="text-center text-gray-500">No contracts available right now.</p>
            )}

            <div className="space-y-4">
                {contracts.map((contract) => (
                    <div key={contract._id} 
                    className="border-2 p-4 rounded-lg border-border shadow-md rounded-lg dark:border-gray-500">
                        
                        <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold">{contract.title}</h3>
                        <button
                        className={`text-2xl transition ${
                            likedListings.includes(contract._id.toString()) ? 'text-pink-500' : 'text-gray-300'
                        }`}
                        onClick={() => toggleLike(contract._id)}
                        >
                        ♥
                        </button>

                        </div>

                        <p><strong>Rent:</strong> ${contract.monthlyRent || "Not specified"} / month</p>
                        <p><strong>Location:</strong> {contract.location}</p>
                        <p>
                            <strong>Rooms:</strong> {contract.rooms}, <strong>Baths:</strong> {contract.baths}
                        </p>
                        {contract.description && <p className="text-sm text-gray-600">{contract.description}</p>}


                        {/* Features */}
                        <div className="text-sm mt-2">
                            {contract.features?.furnished && <p>🏡 Furnished</p>}
                            {contract.features?.washer && <p>🌀 Washer Available</p>}
                            {contract.features?.dryer && <p>🔥 Dryer Available</p>}
                            {contract.features?.petsAllowed && <p>🐾 Pets Allowed</p>}
                        </div>

                        {/* Contact Info */}
                        <div className="mt-4">
                        {revealedEmails[contract._id] ? (
                            <p className="text-blue-600 font-semibold">📞 Contact: {contract.postedBy?.email}</p>
                        ) : (
                            <button
                            onClick={() => handleRevealEmail(contract._id)}
                            className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/80 transition"
                            >
                            Contact
                            </button>
                        )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                    <button
                        className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <p>Page {currentPage} of {totalPages}</p>
                    <button
                        className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContractsPage;
