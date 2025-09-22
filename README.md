React E-Commerce (Firebase)

Small shop demo using React Query for Firestore data/caching and Redux Toolkit for a persistent cart. Categories load dynamically; products can be filtered, added to cart, edited/removed (CRUD), and “checked out.” Orders are stored in Firestore with buyer info, and users can view their order history. Cart persists in sessionStorage as an array (per spec).

Stack

React + TypeScript · Vite · @tanstack/react-query · Redux Toolkit · React-Redux · React-Bootstrap/Bootstrap · Firebase (Auth + Firestore)

Run
npm i
npm run dev

Features

Product listing (React Query): title, price, category, description, rating (+count), image with fallback.
Dynamic categories: pulled from Firestore products; filter by category.
CRUD products: logged-in users can add, edit, or delete products.
Cart (Redux Toolkit): add / change qty / remove / clear; memoized count and total selectors.
Persistence: cart saved to sessionStorage as an array; converted to a map in Redux on load.
Checkout: creates an Orders doc in Firestore (with userId + buyerName/email + items + total + timestamp), clears Redux + sessionStorage, and shows success feedback.
Orders: authenticated users can view past orders and drill into order details.
Auth: Firebase Auth for register, login, logout, profile update, delete account.
Resilient UI: spinners for loading, alerts for errors/empty states, image fallback on 404s.

Architecture

React Query = server state (products/categories/orders): caching, retries, loading/error UI.
Redux Toolkit = app state (cart): simple reducers, Immer safety, selectors for totals.
Context = small UI prefs (selectedCategory, auth state).
Firestore = Products + Orders collections.
Auth = Firebase Authentication for user login/ownership.

Notes

Firestore requires a composite index on Orders (userId ASC + createdAt DESC). The console will prompt you to create it.
Only authenticated users can create/edit products and place/view orders.
Images must use a valid HTTPS URL (imageUrl in product docs).