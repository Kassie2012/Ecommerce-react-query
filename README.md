React E-Commerce (FakeStore API)

Small shop demo using React Query for API data/caching and Redux Toolkit for a persistent cart. Categories load dynamically; products can be filtered, added to cart, and “checked out.” Cart persists in sessionStorage as an array (per spec).

Stack:
React + TypeScript · Vite · @tanstack/react-query · Redux Toolkit · React-Redux · React-Bootstrap/Bootstrap

Run
npm i
npm run dev

Features:

Product listing (React Query): shows title, price, category, description, rating(+count), image.
Dynamic categories: fetched from /products/categories; selecting filters via /products/category/{category}.
Cart (Redux Toolkit): add / change qty / remove / clear; memoized count and total selectors.
Persistence: cart saved to sessionStorage as an array; converted to a map in Redux on load.
Checkout: clears Redux + sessionStorage and shows success feedback.
Resilient UI: spinners for loading, alerts for errors/empty states, image fallback on 404s.

Architecture:

React Query = server state (products/categories): caching, retries, loading/error UI.
Redux Toolkit = app state (cart): simple reducers, Immer safety, selectors for totals.
Context = small UI pref (selectedCategory), avoids over-globalizing.

Files of interest:
src/
  api/api.ts                // axios + fetchers
  pages/Home.tsx            // product grid, queries (keyed by category)
  components/FilterBar.tsx  // dynamic categories + filter
  components/ProductCard.tsx// card UI, rating, image fallback, add-to-cart
  pages/Cart.tsx            // qty controls, remove, totals, checkout
  types/cartSlice.ts        // add/change/remove/clear
  types/selector.ts         // count/total/items
  types/store.ts            // configureStore + sessionStorage array<->map
  context/ProductContext.tsx// selectedCategory
  main.tsx                  // stable QueryClient + Providers

Demo script:

Reload → spinner → products.
Change category → filtered list.
Add to cart → navbar badge increments.
Refresh → badge persists (sessionStorage).
Open Cart → change qty/remove → totals update.
Checkout → success alert; cart clears.

Known quirks:

FakeStore images sometimes 404 → we swap to a placeholder.
Category list is small; fetched dynamically to meet spec.