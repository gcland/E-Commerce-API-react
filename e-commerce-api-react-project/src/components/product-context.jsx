import React, { createContext, useState } from 'react';

export const ProductContext = createContext(null);


export const ProductContextProdiver = (props) => {
    const [cartItems, setCartItems]= useState([])

    const AddToCart = (id) => {
        if (!cartItems.includes(id)) {
            cartItems.push(id)
        console.log('Added to Cart:', id)
        console.log('Cart:',cartItems)
        } else {
            console.log("Cart does not accept duplicate entries.")
        }
        
    };

    const getCart = () => {
        console.log('Cart')
        console.log(cartItems)
        return cartItems
      }
    
    const resetCart = () => {
        setCartItems([])
        console.log('Cart reset')
    }  
    const contextValue = {cartItems, AddToCart, getCart, resetCart};
    return <ProductContext.Provider value={contextValue}>{props.children}</ProductContext.Provider>
}