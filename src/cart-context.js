import React, { useReducer } from 'react'

const CartContext = React.createContext({
    cart: [],
    addFood: () => { },
    removeFood: () => { },
    totalFood: 0
})

const initialCartState = {
    cart: [],
    totalFood: 0
}

const cartReducer = (state, action) => {
    const foodIndex = state.cart.findIndex(cartItem => cartItem.id === action.foodItem.id)
    if (action.type === 'increase') {
        let updatedCart = null
        if (!state.cart[foodIndex])
            updatedCart = state.cart.concat({ ...action.foodItem, count: 1 });
        else {
            updatedCart = [...state.cart]
            updatedCart[foodIndex].count++
            console.log('running')
        }
        return {
            cart: updatedCart,
            totalFood: state.totalFood + 1
        }
    } else if (action.type === 'decrease') {
        let updatedCart = [...state.cart]
        const currentCount = --updatedCart[foodIndex].count
        if (!currentCount)
            updatedCart.splice(foodIndex, 1)
        return {
            cart: updatedCart,
            totalFood: state.totalFood - 1
        }
    } else
        return initialCartState
}

export const CartContextProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, initialCartState)
    const addFood = foodItem => {
        dispatchCart({ type: 'increase', foodItem })
    }
    const removeFood = foodItem => {
        dispatchCart({ type: 'decrease', foodItem })
    }

    return (<CartContext.Provider value={{
        cart: cartState.cart,
        addFood,
        removeFood,
        totalFood: cartState.totalFood
    }}>
        {props.children}
    </CartContext.Provider>)
}

export default CartContext