import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartState = {
    items: Record<number, CartItem>;
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
        changeQuantity: (state: CartState, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items[action.payload.id];
            if (!item) return;
            if (action.payload.quantity <= 0) {
                delete state.items[item.id];
            } else {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state: CartState, action: PayloadAction<number>) => {
            delete state.items[action.payload];
        },
        clearCart: (state: CartState) => {
            state.items = {};
        },
    },
});

export const { addToCart, changeQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;