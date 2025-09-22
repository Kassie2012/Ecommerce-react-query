import { deleteProduct } from "../api/api.firestore";
import { QueryClient } from '@tanstack/react-query';

export async function confirmAndDelete(qc: QueryClient, id: string) {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id);
    qc.invalidateQueries({ queryKey: ['products'] });
    qc.invalidateQueries({ queryKey: ['categories'] });
}