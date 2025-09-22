import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../types/cartSlice";
import type { CartItem } from '../types/cartSlice';

function loadCartFromSession(): Record<string, CartItem> {
    try {
        const raw = sessionStorage.getItem('cart');
        if (!raw) return {};
        const arr = JSON.parse(raw) as CartItem[];
        return Object.fromEntries(arr.map((it) => [it.id, it])); //convert to map
    } catch {
        return{};
    }
}

export const store = configureStore({ 
    reducer: { cart: cartReducer },
    preloadedState: { cart: {items: loadCartFromSession() } }
});

store.subscribe(() => {
    const itemsArray = Object.values(store.getState().cart.items);
    sessionStorage.setItem('cart', JSON.stringify(itemsArray));
});
     
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;