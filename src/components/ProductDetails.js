import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function ProductDetails(props) {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [showMessage, setShowMessage] = useState(false);

    // Get the product from local store and convert it into an object
    const json = localStorage.getItem("currentProduct") || null;
    const currentProduct = JSON.parse(json);

    function onAddToCart(event) {
        // Get the products from local store and convert into array
        const json = localStorage.getItem("cartProducts") || null;
        const cartProducts = JSON.parse(json) || [];

        // If there is no products yet, then add the current product
        const found = cartProducts.find(product => product.id === currentProduct.id);
        if (!found) {
            cartProducts.push(currentProduct);
        }

        // Bump the quantity and update the cart
        const products = cartProducts.map((product) => {
            if (product.id === currentProduct.id) {
                product.quantity += parseInt(quantity);
            }
            return product;
        });

        // Update the stringified products in local storage
        localStorage.setItem("cartProducts", JSON.stringify(products));

        // Show message and clear it out after a few seconds
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    }

    function onQuantityChange(event) {
        setQuantity(event.target.value);
    }

    return (
        <div>
            <img width="200" height="200" src={currentProduct.image} alt="product thumbnail" />
            <h4>{currentProduct.title}</h4>
            <p>{currentProduct.description}</p>
            <p>Category: {currentProduct.category}</p>
            <p>Price: ${currentProduct.price}</p>
            <div>
                <span>Quantity: </span>
                <input onChange={onQuantityChange} type="number" value={quantity}/>
            </div>
            <button style={{margin: '10px'}} onClick={onAddToCart}>Add Cart</button>
            { showMessage && <p>{quantity} Added to cart</p> }
        </div>
    )
}

export default ProductDetails;