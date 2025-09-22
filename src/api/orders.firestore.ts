import { db } from '../lib/firebase/firebase';
import { addDoc, collection, doc,getDoc, getDocs, query, where, orderBy, serverTimestamp, Timestamp, } from "firebase/firestore";
import type { Order, OrderItem } from '../types/types';

const ORDERS = "Orders";

export async function createOrder(
    userId: string, 
    items: OrderItem[], 
    total: number,
    buyer?: {name?: string | null; email?: string | null }
    ) {
    const ref = await addDoc(collection(db, ORDERS), {
        userId,
        items,
        total,
        createdAt: serverTimestamp(),
        buyerName: buyer?.name ?? null,
        buyerEmail: buyer?.email ?? null,
    });
    return ref.id;
}

export async function fetchUserOrders(userId: string): Promise<Order[]> {
    const q = query(
        collection(db, ORDERS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
        const data = d.data() as any;
        const createdAt = 
            data.createdAt instanceof Timestamp ? data.createdAt.toDate(): new Date();
        return {
            id: d.id,
            userId: data.userId,
            items: data.items ?? [],
            total: Number(data.total ?? 0),
            createdAt,
            buyerName: data.buyerName ?? null,
            buyerEmail: data.buyerEmail ?? null,
        } as Order;
    });
}

export async function fetchOrder(orderId:string): Promise<Order | null> {
    const ord = await getDoc(doc(db, ORDERS, orderId));
    if (!ord.exists()) return null;
    const data = ord.data() as any;
    const createdAt = 
        data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
    return {
        id: ord.id,
        userId: data.userId,
        items: data.items ?? [],
        total: Number(data.total ?? 0),
        createdAt,
    } as Order;
}

