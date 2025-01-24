import React, {useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from '../components/Sublease/GoogleMap';

//REMOVE ONCE YOU HAVE DATA
const mockSubleases = [
    {
        id: 1,
        title: 'Beautiful Studio Apartment',
        price: '$1,200/month',
        beds: 1,
        baths: 1,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'Spacious 2-Bedroom Apartment',
        price: '$2,400/month',
        beds: 2,
        baths: 2,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: 'Affordable Room for Rent',
        price: '$800/month',
        beds: 1,
        baths: 1,
        image: 'https://via.placeholder.com/150',
    },
]

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
                        {mockSubleases.map((sublease) => (
                            <div key={sublease.id} className='border p-4 rounded shadow'>
                                <img
                                    src={sublease.image}
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