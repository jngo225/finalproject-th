import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { CardActionArea } from '@mui/material';

export default function ProductCard(props) {
    const [product, setProduct] = useState({});
    const [show, setShow] = useState(false);

    let fadeInTimer = 0;
    let fadeOutTimer = 0;

    useEffect(() => {
        FadeIn();
    }, []);

    function RandomProduct(category) {
        const key = category.replace(" ", "-").replace("'", "-");
        const jsonData = localStorage.getItem(key) || "";
        const products = JSON.parse(jsonData);

        if (!products || products.length === 0) {
            return;
        }

        // Keep picking a random product until it gets a different one than the previous one
        while (true) {
            const randomIndex = Math.floor(Math.random() * products.length);
            const tmp = products[randomIndex];
            if (tmp.id !== product.id) {
                setProduct(tmp);
                break;
            }
        }
    }

    function FadeOut() {
        setShow(false);

        if (fadeInTimer !== 0) {
            clearTimeout(fadeInTimer);
        }

        fadeInTimer = setTimeout(() => {
            FadeIn();
        }, 100);
    }

    function FadeIn() {
        RandomProduct(props.category);

        setShow(true);

        // Timeout is randomized from 5 to 14 microseconds
        const timeout = (Math.floor(Math.random() * 10) * 1000) + 5000;

        if (fadeOutTimer !== 0) {
            clearTimeout(fadeOutTimer);
        }

        fadeOutTimer = setTimeout(() => {
            FadeOut();
        }, timeout);
    }

    function onClickProduct(product) {
        localStorage.setItem("currentProduct", JSON.stringify(product));
        window.location.href=`/products/${product.id}`;
    }

    return (
        <Card sx={{ margin: 5, minWidth: 400, maxWidth: 345, minHeight: 400}} onClick={() => onClickProduct(product)}>
            <Fade in={show} timeout={ show ? 2000 : 0 } >
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
