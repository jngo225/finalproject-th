import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

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
        // <div>
        //     { products.length === 0 && <h4>Cart is empty</h4> }
        //     { products.map((product, index) => {
        //         return (
        //             <>
        //                 <h4>{product.title}</h4>
        //                 <p>Price: ${product.price}</p>
        //                 <p>Quantity: {product.quantity}</p>
        //                 <button onClick={() => onDeleteProduct(index)}>Delete</button>
        //                 <hr/>
        //             </>
        //         )
        //     })}
        // </div>

        <Card sx={{ margin: 5, maxWidth: 400, minHeight: 400}}>
            <CardContent>
                { products.length === 0 && <Typography variant="h6">Cart is empty</Typography> }
                { products.map((product, index) => {
                    return (
                        <Grid container direction="column" spacing={2}>
                            <Grid item >
                                <Typography gutterBottom variant="h6" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    ${product.price}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Quantity: {product.quantity}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={() => onDeleteProduct(index)}>Delete</Button>
                            </Grid>
                            <Grid item>
                                <Divider />
                            </Grid>
                        </Grid>
                    );
                })}
            </CardContent>
        </Card>
    );
}