import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Animation from '../components/animation_background';

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
    const [editContract, setEditContract] = useState<Contract | null>(null);
    
    const fetchContracts = async (page: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5001/api/housing-contracts', {
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

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleEditClick = (contract: Contract) => {
        setEditContract(contract);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editContract) return;

        const updatedContract = { ...editContract, [e.target.name]: e.target.value };

        // Ensure that updatedContract is a valid Contract before setting it
        if (isValidContract(updatedContract)) {
            setEditContract(updatedContract);
        }
    };


    // Utility function to check if an object is a valid Contract
    const isValidContract = (contract: Partial<Contract>): contract is Contract => {
        return contract._id !== undefined && contract.title !== undefined && contract.location !== undefined;
    };

    const handleSaveChanges = async () => {
        if (!selectedContract) return;

        try {
            const response = await axios.put(
                `http://localhost:5001/api/housing-contracts/${selectedContract._id}`,
                editContract,
            );

            setContracts((prev) =>
                prev.map((contract) =>
                    contract._id === selectedContract._id ? response.data : contract
                )
            );
            
            setSelectedContract(null);
            setEditContract(null);
        } catch (err) {
            console.error('Error updating contract:', err);
        }
    };
    

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4">
            {/* ANIMATION */}
            {/* <div className='z-0'>
            <Animation />
            </div> */}


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
                        <h3 className="text-lg font-bold ">{contract.title}</h3>
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
                        {contract.postedBy?.email && (
                            <p className="mt-2 text-blue-600 font-semibold">
                                📞 Contact: {contract.postedBy.email}
                            </p>
                        )}
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
