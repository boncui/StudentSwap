import React from 'react';
import MapComponent from '../components/Sublease/GoogleMap';

const SubleasePage:React.FC = () => {
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
                    {/* Placeholder for Sublease Cards */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='border p-4 rounded shadow'>
                            <p>Sublease Card 1</p>
                        </div>
                        <div className='border p-4 rounded shadow'>
                            <p>Sublease Card 2</p>
                        </div>
                        <div className='border p-4 rounded shadow'>
                            <p>Sublease Card 3</p>
                        </div>
                        <div className='border p-4 rounded shadow'>
                            <p>Sublease Card 4</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubleasePage;