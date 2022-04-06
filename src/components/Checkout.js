import { useState, useMemo, useEffect } from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Checkout() {
    const [products, setProducts] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});
    const [checkoutInfo, setCheckoutInfo] = useState("");

    useEffect(() => {
        getProducts();
    },[])

    function getProducts() {
        // Get the products from local store and convert into array
        const json = localStorage.getItem("cartProducts") || null;
        const cartProducts = JSON.parse(json) || [];

        setProducts(cartProducts);
    }

    function clearCart() {
        localStorage.removeItem("cartProducts");
    }

    const total = useMemo(() => {
        const totalCost = products.reduce((sum, product) => {
            return sum + (product.price * product.quantity);
        }, 0);

        return totalCost.toFixed(2);
    }, [products]);

    function onSubmit(event) {
        const message = `Processing order for ${shippingInfo.name} at ${shippingInfo.shippingAddress}`;
        setCheckoutInfo(message);

        setTimeout(() => {
            clearCart();
            window.location.href = "/products";
        }, 3000);
    }

    function onChange(event) {
        const {name, value} = event.target;
        setShippingInfo({...shippingInfo, [name]: value })
    }

    return (
        <Card sx={{ margin: 5, maxWidth: 400, minHeight: 400}}>
            <CardContent>
                { products.length === 0 && <Typography variant="h6">No items to checkout</Typography> }
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
                                <Divider />
                            </Grid>
                        </Grid>
                    )
                })}
            </CardContent>
            { products.length !== 0 &&
                <>
                    <CardContent>
                        <Typography variant="h6">Total: ${total} </Typography>
                    </CardContent>
                    <CardContent>
                        <div>
                            <Typography variant="h4">Shipping Information</Typography>
                            <TextField
                                style={{margin:10}}
                                label="Name"
                                name="name"
                                onChange={onChange} 
                                value={shippingInfo.name}
                                InputLabelProps={{ shrink: true, }} />
                            <TextField
                                style={{margin:10}}
                                label="Shipping Address"
                                name="shippingAddress"
                                onChange={onChange} 
                                value={shippingInfo.shippingAddress}
                                InputLabelProps={{ shrink: true, }} />
                            <TextField
                                style={{margin:10}}
                                label="Billing Address"
                                name="billingAddress"
                                onChange={onChange} 
                                value={shippingInfo.billingAddress}
                                InputLabelProps={{ shrink: true, }} />
                            <TextField
                                style={{margin:10}}
                                name="creditCard"
                                label="Credit Card"
                                onChange={onChange} 
                                value={shippingInfo.creditCard}
                                InputLabelProps={{ shrink: true, }} />
                        </div>
                    </CardContent>
                    <div style={{margin:20}}>
                        <Button variant="outlined" onClick={onSubmit}>Submit</Button>
                        { checkoutInfo !== "" && <div>{checkoutInfo}</div>}
                    </div>
                </>
            }

        </Card>
    )

    // return (
    //     <>
    //     <div>
    //     { products.length === 0 && <h4>No items to checkout</h4> }
    //     {
    //         products.map((product, index) => {
    //             return (
    //                 <>
    //                     <h4>{product.title}</h4>
    //                     <p>Price: ${product.price}</p>
    //                     <p>Quantity: {product.quantity}</p>
    //                     <hr/>
    //                 </>
    //             )
    //         })
    //     }
    //     </div>
    //     { products.length !== 0 &&
    //         <>
    //         <div>
    //             <b>Total:</b> ${total}
    //         </div>
    //         <hr/>
    //         <div>
    //             <h2>Shipping Information</h2>
    //             <br/>
    //             <table>
    //                 <tr>
    //                     <td>Name: </td>
    //                     <td><input onChange={onChange} type="text" name="name" value={shippingInfo.name} required/></td>
    //                 </tr>
    //                 <tr>
    //                     <td>Shipping Address: </td>
    //                     <td><input onChange={onChange} type="text" name="shippingAddress" value={shippingInfo.shippingAddress} required/></td>
    //                 </tr>
    //                 <tr>
    //                     <td>Billing Address: </td>
    //                     <td><input onChange={onChange} type="text" name="billingAddress" value={shippingInfo.billingAddress} required/></td>
    //                 </tr>
    //                 <tr>
    //                     <td>Credit Card: </td>
    //                     <td><input onChange={onChange} type="text" name="creditCard" value={shippingInfo.creditCard} required/></td>
    //                 </tr>
    //             </table>
    //             <br/>
    //             <button onClick={onSubmit}>Submit</button>
    //             <br/>
    //             <br/>
    //             { checkoutInfo !== "" && <div>{checkoutInfo}</div>}
    //         </div>
    //         </>
    //     }
    //     </>
    // )

}