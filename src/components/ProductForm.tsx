import { useState } from "react";
import { createProduct } from "../api/api.firestore";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const qc = useQueryClient();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(!title || price ==="" || !category || !imageUrl) return;
        await createProduct({
            title,
            price: Number(price),
            category,
            imageUrl,
            description,
        });

        qc.invalidateQueries({ queryKey: ['products'] });
        qc.invalidateQueries({ queryKey: ['categories'] });

        //quick reset
        setTitle('');
        setPrice('');
        setCategory('');
        setImageUrl('');
        setDescription('');
        alert("Product created");
    }

    return (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />
            <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input placeholder="Image Url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value.trim())} />
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Product</button>
        </form>
    )

}