import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

type CartState = {
    items: Record<string, CartItem>;
};

const initialState: CartState = { items: {} };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<Omit<CartItem, "quantity">>) => {
            const p = action.payload;
            if (state.items[p.id]) {
                state.items[p.id].quantity += 1;
            } else {
                state.items[p.id] = { ...p, quantity: 1 };
            }
        },
        changeQuantity: (state: CartState, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items[action.payload.id];
            if (!item) return;
            if (action.payload.quantity <= 0) {
                delete state.items[item.id];
            } else {
                item.quantity = action.payload.quantity;
            } 
        }, //removes item when quantity is 0
 
        removeFromCart: (state: CartState, action: PayloadAction<string>) => {
            delete state.items[action.payload];
        },
        clearCart: (state: CartState) => {
            state.items = {};
        },
    },
});

export const { addToCart, changeQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;