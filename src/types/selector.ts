import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';


export const selectCartMap = (state: RootState) => state.cart.items; //Record<number, CartItem>
export const selectCartItems = createSelector(
    [selectCartMap], (m) => Object.values(m)); // array for mapping UI


export const selectCartCount = createSelector(
    [selectCartItems], (it) => it.reduce((n, i) => n + i.quantity, 0)); // adding items and quantity

export const selectCartTotal = createSelector(
    [selectCartItems], (it) => it.reduce((n, i) => n + i.price * i.quantity, 0)); // adding cart total