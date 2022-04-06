import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { CardActionArea } from '@mui/material';

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

    return (
        <div>
            { products.length === 0 && 
                <Box sx={{ width: '100%'}}>
                    <LinearProgress/>
                    <Typography variant="body1">Loading...</Typography>
                </Box> 
            }

            <Grid container spacing={2}>
            {
                products.map((product, index) => {
                    return (
                        <Grid item xs={4}>
                            {ProductCard(product)}
                        </Grid>
                    )
                })
            }
            </Grid>
        </div>
    )
}

export default Products;