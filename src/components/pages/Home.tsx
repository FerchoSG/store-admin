import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="">
            <Link to='/add-item' className="bg-blue-300 rounded px-4 py-2 hover:bg-blue-500 text-white font-bold">
                Add a Item
            </Link>
        </div>
    );
}

export default Home;