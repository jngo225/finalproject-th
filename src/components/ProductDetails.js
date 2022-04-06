import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        // <div>
        //     <img width="200" height="200" src={currentProduct.image} alt="product thumbnail" />
        //     <h4>{currentProduct.title}</h4>
        //     <p>{currentProduct.description}</p>
        //     <p>Category: {currentProduct.category}</p>
        //     <p>Price: ${currentProduct.price}</p>
        //     <div>
        //         <span>Quantity: </span>
        //         <input onChange={onQuantityChange} type="number" value={quantity}/>
        //     </div>
        //     <button style={{margin: '10px'}} onClick={onAddToCart}>Add Cart</button>
        //     { showMessage && <p>{quantity} Added to cart</p> }
        // </div>

        <Card sx={{ margin: 5, maxWidth: 400, minHeight: 400}}>
            <CardMedia
                component="img"
                height={200}
                image={currentProduct.image}
                alt={currentProduct.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {currentProduct.title}
                </Typography>
                <Divider />
                <Typography gutterBottom variant="body1" component="div">
                    {currentProduct.description}
                </Typography>
                <Divider />
                <Typography gutterBottom variant="h6" component="div">
                    {currentProduct.category}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    ${currentProduct.price}
                </Typography>
            </CardContent>
            <Grid container alignItems="center" direction="row" margin={2}>
                <Grid item xs={8}>
                    <TextField
                        id="quantity"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={onQuantityChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={onAddToCart}>Add Cart</Button>
                </Grid>
            </Grid>
            <Grid container margin={2} height={20}>
                { showMessage && 
                    <Grid item>
                        <Typography variant="subtitle2">{quantity} Added to cart</Typography> 
                    </Grid>
                }
            </Grid>
        </Card>
    )
}

export default ProductDetails;