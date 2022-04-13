import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import { CardActionArea } from '@mui/material';
import { PreviewSharp } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const API_ENDPOINT = "https://fakestoreapi.com";

export default function Home() {
    const [previewProducts, setPreviewProducts] = useState([]);

    useEffect(() => {
        getCategories();
        generatePreviewProducts();
        setInterval(generatePreviewProducts, 5000);
    }, []);

    function getCategories() {
        axios.get(API_ENDPOINT + "/products/categories").then(response => {
            localStorage.setItem("categories", JSON.stringify(response.data));
            response.data.map((category) => {
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

    function onClickProduct(product) {
        localStorage.setItem("currentProduct", JSON.stringify(product));
        window.location.href=`/products/${product.id}`;
    }

    function ProductCard(product) {
        return (
            <Card sx={{ margin: 5, maxWidth: 345, minHeight: 400}} onClick={() => onClickProduct(product)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height={200}
                        image={product.image}
                        alt={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            ${product.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

    function RandomProduct(category) {
        const key = category.replace(" ", "-").replace("'", "-");
        const jsonData = localStorage.getItem(key) || "";
        const products = JSON.parse(jsonData);

        if (!products || products.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * products.length);
        const product = { ...products[randomIndex], show: true };

        return product;
    }

    function generatePreviewProducts() {
        let newProducts = [];

        const jsonData = localStorage.getItem("categories") || "";
        const categories = JSON.parse(jsonData);

        categories.map(category => {
            const product = RandomProduct(category);
            newProducts.push(product);
        })

        setPreviewProducts(newProducts);
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
                { previewProducts.map((product) => {
                        return (
            <Fade in={product.show} timeout={2000}>
                            <Grid item xs={4}>
                                {ProductCard(product)}
                            </Grid>
            </Fade>
                        )
                    })
                }
                </Grid>
            </div>
        </React.Fragment>
    );
}