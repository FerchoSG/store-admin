import React from 'react';
import { Values } from '../../interfaces';

const Item = ({ name, stock, price, description, category, image }: Values) => {
    return (
        <div className="flex flex-col lg:flex-row items-center p-4 gap-3 border-b-2 lg:border-b-0">
            <div className=" lg:w-1/5 w-4/5  rounded-md ">
                <img src={image} alt="item "
                    className="lg:object-cover md:object-cover shadow-xl border rounded-xl p-4  "
                />
            </div>
            <div className=" h-full w-4/5 p-3 shadow-lg border rounded-xl ">
                <p className="text-lg">Name: <span className="font-bold ">{name} </span></p>
                <p className="text-lg">Price: <span className="font-bold ">${price} </span></p>
                <p className="text-lg">Stock: <span className="font-bold ">{stock} </span></p>
                <p className="text-lg">Category: <span className="font-bold ">{category} </span></p>
                <p className="text-lg">Description: <span className="font-bold ">{description} </span></p>
            </div>
        </div>
    );
}

export default Item;