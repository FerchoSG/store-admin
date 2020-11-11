import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from "../../firebase";
import { Values } from "../../interfaces";
import Item from '../ui/Item';

const Items = () => {

    const { firebase } = useContext(FirebaseContext)
    const [items, setItems] = useState<Array<Values>>([])

    useEffect(function () {
        async function getItems() {
            firebase.db.collection('items').onSnapshot((snapshot) => {
                const items: Array<Values> = []
                snapshot.docs.map(item => (
                    items.push(item.data())
                ))
                setItems(items)
            })

        }

        getItems()
    }, [firebase.db])



    return (
        <div className="max-h-full overflow-y-auto ">
            {items.length > 0 ? (
                items.map((item: Values, index) => (
                    <Item
                        key={index}
                        name={item.name}
                        price={item.price}
                        stock={item.stock}
                        image={item.image}
                        category={item.category}
                        description={item.description}
                    />
                ))
            ) : null}
        </div>
    );
}

export default Items;