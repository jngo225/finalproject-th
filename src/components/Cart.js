import { useState, useEffect } from "react";

export default function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    },[])

    function getProducts() {
        // Get the products from local store and convert into array
        const json = localStorage.getItem("cartProducts") || null;
        const cartProducts = JSON.parse(json) || [];

        setProducts(cartProducts);
    }

    function onDeleteProduct(index) {
        // Remove product from the array
        const temp = products;
        temp.splice(index, 1);

        localStorage.setItem("cartProducts", JSON.stringify(temp));
        getProducts();
    }

    return (
        <div>
            { products.length === 0 && <h4>Cart is empty</h4> }
            { products.map((product, index) => {
                return (
                    <>
                        <h4>{product.title}</h4>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <button onClick={() => onDeleteProduct(index)}>Delete</button>
                        <hr/>
                    </>
                )
            })}
        </div>

    );
}