import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { CardActionArea } from '@mui/material';

export default function ProductCard(props) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        RandomProduct(props.category);

        setInterval(() => {
            RandomProduct(props.category);
        }, 5000);
    }, []);

    function RandomProduct(category) {
        const key = category.replace(" ", "-").replace("'", "-");
        const jsonData = localStorage.getItem(key) || "";
        const products = JSON.parse(jsonData);

        if (!products || products.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * products.length);
        setProduct(products[randomIndex]);
    }

    function onClickProduct(product) {
        localStorage.setItem("currentProduct", JSON.stringify(product));
        window.location.href=`/products/${product.id}`;
    }

    return (
        <Card sx={{ margin: 5, minWidth: 400, maxWidth: 345, minHeight: 400}} onClick={() => onClickProduct(product)}>
            <Fade in={true} timeout={2000} >
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
            </Fade>
        </Card>
    )
}
