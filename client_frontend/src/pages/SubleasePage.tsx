import React, {useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from '../components/Sublease/GoogleMap';

interface Sublease {
    id: string;
    title: string;
    price: string;
    beds: number;
    baths: number;
    image: string;
}

const SubleasePage:React.FC = () => {
    const [subleases, setSubleases] = useState<Sublease[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchSubleases = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:5001/api/housing-contracts')
                setSubleases(response.data);
            } catch (err) {
                setError('Failed to fetch sublease data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubleases();
    }, []);

    return (
        <div className='flex h-screen'>
            {/*Left: Map*/}
            <div className = "w-1/2 border-r">
                <div className='h-full'>
                    {/*Map will go Here*/}
                    <MapComponent/>
                </div>
            </div>

            {/*Right: Sublease Listings*/}
            <div className='w-1/2'>
                {/* Filters and Sorting */}
                <div className='p-4 bg-white border-b shadow'>
                    <div className='flex justify-between items-center'>
                        <div className='flex space-x-4'>
                            <button className='border px-4 py-2 rounded hover:bg-gray-100'>Beds</button>
                            <button className='border px-4 py-2 rounded hover:bg-gray-100'>Baths</button>
                            <button className='border px-4 py-2 rounded hover:bg-gray-100'>Price</button>
                            <button className='border px-4 py-2 rounded hover:bg-gray-100'>Sort</button>
                        </div>
                        <button className='border px-4 py-2 rounded hover:bg-gray-100'>More Filters</button>
                    </div>
                </div>

                {/* Sublease Listings */}
                <div className='p-4'>
                    {loading && <p>Loading sublease listings...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='grid grid-cols-2 gap-4'>
                        {subleases.map((sublease) => (
                            <div key={sublease.id} className='border p-4 rounded shadow'>
                                <img
                                    src={sublease.image || 'https://via.placeholder.com/150'}
                                    alt={sublease.title}
                                    className='w-full h-32 object-cover rounded mb-2'
                                />
                                <h2 className='font-bold text-lg'>{sublease.title}</h2>
                                <p>{sublease.price}</p>
                                <p>
                                    {sublease.beds} Bed{(sublease.beds > 1) ? 's' : ''}, {' '}
                                    {sublease.baths} bath{(sublease.baths > 1) ? 's' : ''}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubleasePage;