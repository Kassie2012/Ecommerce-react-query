import { db } from "../lib/firebase/firebase"; //connection to firebase
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import type { Product, Category } from "../types/types";

const PRODUCTS = "Products";

// create
export async function createProduct(product: Omit<Product, "id">) {
    const ref = await addDoc(collection(db, PRODUCTS), product);
    return {id: ref.id, ...product } as Product;
}

//update
export async function updateProduct(id: string, data: Partial<Omit<Product, "id">>) {
    await updateDoc(doc(db, PRODUCTS, id), data);
    return { id, ...data };
}

//get all products
export async function fetchProducts() : Promise<Product[]> {
    const snap = await getDocs(collection(db, PRODUCTS));//gets all products from the firestore collection
    return snap.docs.map(d => ({ 
        id: d.id, //firestore id
        ...(d.data() as Omit<Product, "id">), //fields inside the doc
    }));
} // returns an array of products

//get one product by id
export async function fetchProduct(id: string): Promise<Product | null> {
    const snap = await getDoc(doc(db, PRODUCTS, id)); //gets one document and reads it
    return snap.exists() //if same returns data
     ? { id: snap.id, ...(snap.data() as Omit<Product, "id">) } 
     : null;// if not null
}

//category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    const q = query(collection(db, PRODUCTS), where("category", "==", category));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
}

//categories -- fetches distint categories

export async function fetchCategories(): Promise<Category[]> {
    const snap = await getDocs(collection(db, PRODUCTS));
    const set = new Set<string>(); //set avoids duplicates
    snap.forEach(doc => {
        const data = doc.data() as Partial<Product>;
        if (data.category) set.add(data.category);
    });
    return Array.from(set)
}

//delete
export async function deleteProduct(id: string) {
    await deleteDoc(doc(db, PRODUCTS, id));
}
