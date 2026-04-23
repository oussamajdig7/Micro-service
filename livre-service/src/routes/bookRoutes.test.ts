import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import bookRoutes from './bookRoutes.js';

vi.mock('../models/Book.js', () => ({
  default: {
    find: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  }
}));

import Book from '../models/Book.js';

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

describe('Book Routes', () => {
  it('GET /books should return all books', async () => {
    const mockBooks = [{ title: 'Test Book', author: 'Test Author', available: true }];
    (Book.find as any).mockResolvedValue(mockBooks);

    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBooks);
  });

  it('POST /books should create a new book', async () => {
    const mockBook = { title: 'New Book', author: 'New Author', available: true, _id: '123' };
    (Book.create as any).mockResolvedValue(mockBook);

    const response = await request(app).post('/books').send({ title: 'New Book', author: 'New Author' });
    // bookController returns just res.json(book) meaning default 200 status
    expect(response.status).toBe(200); 
    expect(response.body).toEqual(mockBook);
  });

  it('GET /books/:id should return a book if found', async () => {
    const mockBook = { title: 'Test Book', author: 'Test Author', available: true, _id: '123' };
    (Book.findById as any).mockResolvedValue(mockBook);

    const response = await request(app).get('/books/123');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBook);
  });

  it('GET /books/:id should return 404 if not found', async () => {
    (Book.findById as any).mockResolvedValue(null);

    const response = await request(app).get('/books/123');
    expect(response.status).toBe(404);
  });

  it('PUT /books/:id should update a book', async () => {
    const mockBook = { title: 'Updated Book', author: 'Test Author', available: false, _id: '123' };
    (Book.findByIdAndUpdate as any).mockResolvedValue(mockBook);

    const response = await request(app).put('/books/123').send({ title: 'Updated Book' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBook);
  });
});
