import React from 'react';
import { Link } from 'react-router-dom';

const NavBar:React.FC = () => {
    return (
        <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            {/*Left Side Links*/}
            <div className='flex space-x-4'>
                <Link to='/listings' className="hover:underline">Listings</Link>
                <Link to='/subleases' className="hover:underline">Subleases</Link>
                <Link to='/market' className="hover:underline">Market</Link>
                <Link to='/resources' className="hover:underline">Resources</Link>
            </div>

            {/*Right Side Links*/}
            <div className='flex spave-x-4'>
                <Link to='list-with-us' className="hover:underline">List with us</Link>
                <Link to='account' className="hover:underline">Account</Link>
            </div>
        </nav>
    );
};

export default NavBar;