import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const API_ENDPOINT = "https://fakestoreapi.com";

function Products(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);
    
    function getProducts() {
        axios.get(API_ENDPOINT + "/products").then((response) => {
            const newProducts = response.data.map((product) => {
                return { ...product, quantity: 0 };
            });

            setProducts(newProducts);
        })
        .catch((err) => {
            alert("Failed to get products. Error: " +  err.message());
        });
    }

    function onClickProduct(product) {
        localStorage.setItem("currentProduct", JSON.stringify(product))
    }

    return (
        <div>
            { products.length === 0 && <div>Loading...</div> }

            {
                products.map((product, index) => {
                    return (
                        <>
                            <div>
                                <Link to={`/products/${product.id}`}>
                                    <img onClick={() => onClickProduct(product)} width="200" height="200" src={product.image} alt="product thumbnail" />
                                </Link>
                            </div>
                            <h4>{product.title}</h4>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            { product.quantity > 0 && <p>Quantity: {product.quantity}</p> }
                            <hr></hr>
                        </>
                    )
                }
                )
            }
        </div>
    )
}

export default Products;