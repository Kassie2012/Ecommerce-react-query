import { useState, useEffect } from 'react';
import { Modal, Button, Form, Stack } from 'react-bootstrap';
import { updateProduct } from '../api/api.firestore';
import type { Product } from '../types/types';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  show: boolean;
  onHide: () => void;
  product: Product | null;
};

export default function EditProductModal({ show, onHide, product }: Props) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const qc = useQueryClient();

  useEffect(() => {
    if (product) {
      setTitle(product.title ?? '');
      setPrice(product.price ?? '');
      setCategory(product.category ?? '');
      setImageUrl(product.imageUrl ?? '');
      setDescription(product.description ?? '');
    }
  }, [product]); //prefills form from product

  async function onSave() {
    if (!product) return;
    await updateProduct(product.id, {
      title,
      price: Number(price || 0),
      category,
      imageUrl,
      description,
    }); //calls firestore update

    qc.invalidateQueries({ queryKey: ['products']});
    qc.invalidateQueries({ queryKey: ['categories']});
    onHide();
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>Edit Product</Modal.Title></Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <Form.Control placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <Form.Control type="number" placeholder="Price" value={price} 
          onChange={(e)=>setPrice(e.target.value === '' ? '': Number(e.target.value))} />
          <Form.Control placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
          <Form.Control placeholder="ImageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} />
          <Form.Control as="textarea" rows={3} placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
