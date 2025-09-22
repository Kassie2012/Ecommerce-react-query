export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    rating?: {
        rate: number;
        count: number;
    };
}; 

export type Category = string;

export interface OrderItem {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    createdAt: Date;
    items: OrderItem[];
    total: number;
    buyerName?: string | null;
    buyerEmail?: string | null;
}