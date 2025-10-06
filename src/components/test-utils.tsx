import type { ReactNode, ReactElement } from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, type RenderOptions } from '@testing-library/react';
import cartReducer from '../types/cartSlice';

const rootReducer = combineReducers( { cart: cartReducer });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<AppState>) {
    return configureStore({
        reducer: rootReducer,
         preloadedState: preloadedState as AppState | undefined, //allows for partial state in tests
        }) 
    }

    export function renderWithStore(
        ui: ReactElement,
        opts?: { preloadedState?: Partial<AppState>; store?: AppStore } & RenderOptions
    ) {
        const { preloadedState, store = makeStore(preloadedState), ...options } = opts ?? {}
        
        function Wrapper({ children }: {children: ReactNode }) {
            return <Provider store={store}>{children}</Provider>;
        }
        return { store, ...render(ui, { wrapper: Wrapper, ...options}) }
}
//custom render function that includes redux store provider
