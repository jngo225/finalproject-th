import React, { useState, useEffect } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const API_ENDPOINT = "https://fakestoreapi.com";

export default function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
        // generatePreviewProducts();
    }, []);

    function getCategories() {
        axios.get(API_ENDPOINT + "/products/categories").then(response => {
            const categoryArray = response.data;

            localStorage.setItem("categories", JSON.stringify(categoryArray));
            setCategories(categoryArray);

            categoryArray.map((category) => {
                getProducts(category);
            })
        })
        .catch((err) => {
            alert("Failed to get categories. Error: " +  err.message());
        });
    }

    function getProducts(category) {
        axios.get(API_ENDPOINT + "/products/category/" + category).then((response) => {
            const key = category.replace(" ", "-").replace("'", "-");
            localStorage.setItem(key, JSON.stringify(response.data));
        })
        .catch((err) => {
            alert("Failed to get products for category. Error: " +  err.message());
        });
    }

    return (
        <React.Fragment>
            <div style={{background:"lightgrey"}}>
                <hr/>
                <h1 style={{textAlign:"center"}}>J-STOREFRONT</h1>
                <hr/>
            </div>

            <div>
                <Grid container spacing={2}>
                    { categories.map(category => {
                        return <ProductCard category={category} />
                    })}
                </Grid>
            </div>
        </React.Fragment>
    );
}