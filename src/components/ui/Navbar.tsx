import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-blue-800 md:w-2/6 xl:w-1/6 shadow-lg pb-2 lx:min-h-screen">
            <div className="h-32 flex justify-center items-center">
                <h2 className="font-bold uppercase text-2xl text-pink-100">
                    Store Admin
                </h2>
            </div>
            <nav className="flex-column px-2">
                <NavLink to='/' exact
                    activeClassName="font-bold text-gray-700 bg-pink-100"
                    className="w-full block mb-2 px-4 py-2 text-gray-300 rounded text-xl hover:bg-pink-100 hover:text-gray-600">
                    Home
                </NavLink>
                <NavLink to='/items' exact
                    activeClassName="font-bold mb-2 text-gray-700 bg-pink-100"
                    className="w-full block px-4 py-2 text-gray-300 text-xl rounded hover:bg-pink-100 hover:text-gray-600">
                    Items
                </NavLink>
            </nav>
        </div>
    );
}

export default Navbar;