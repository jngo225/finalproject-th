import { useState, useMemo, useEffect } from "react";

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
        <>
        <div>
        { products.length === 0 && <h4>No items to checkout</h4> }
        {
            products.map((product, index) => {
                return (
                    <>
                        <h4>{product.title}</h4>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <hr/>
                    </>
                )
            })
        }
        </div>
        { products.length !== 0 &&
            <>
            <div>
                <b>Total:</b> ${total}
            </div>
            <hr/>
            <div>
                <h2>Shipping Information</h2>
                <br/>
                <table>
                    <tr>
                        <td>Name: </td>
                        <td><input onChange={onChange} type="text" name="name" value={shippingInfo.name} required/></td>
                    </tr>
                    <tr>
                        <td>Shipping Address: </td>
                        <td><input onChange={onChange} type="text" name="shippingAddress" value={shippingInfo.shippingAddress} required/></td>
                    </tr>
                    <tr>
                        <td>Billing Address: </td>
                        <td><input onChange={onChange} type="text" name="billingAddress" value={shippingInfo.billingAddress} required/></td>
                    </tr>
                    <tr>
                        <td>Credit Card: </td>
                        <td><input onChange={onChange} type="text" name="creditCard" value={shippingInfo.creditCard} required/></td>
                    </tr>
                </table>
                <br/>
                <button onClick={onSubmit}>Submit</button>
                <br/>
                <br/>
                { checkoutInfo !== "" && <div>{checkoutInfo}</div>}
            </div>
            </>
        }
        </>
    )

}