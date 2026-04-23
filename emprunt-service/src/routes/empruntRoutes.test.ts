import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import empruntRoutes from './empruntRoutes.js';

// 🔌 mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  }
}));

// 📚 mock Emprunt model
vi.mock('../models/Emprunt.js', () => ({
  default: {
    find: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
  }
}));

import axios from 'axios';
import Emprunt from '../models/Emprunt.js';

const app = express();
app.use(express.json());
app.use('/emprunts', empruntRoutes);

describe('Emprunt Routes', () => {

  // ✅ GET all
  it('GET /emprunts should return all emprunts', async () => {
    const mockData = [{ userName: 'Oussama', bookId: '123' }];
    (Emprunt.find as any).mockResolvedValue(mockData);

    const res = await request(app).get('/emprunts');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  // ✅ POST create emprunt
  it('POST /emprunts should create emprunt if book available', async () => {
    const mockBook = { _id: '123', available: true };
    const mockEmprunt = { userName: 'Oussama', bookId: '123' };

    (axios.get as any).mockResolvedValue({ data: mockBook });
    (axios.put as any).mockResolvedValue({});
    (Emprunt.create as any).mockResolvedValue(mockEmprunt);

    const res = await request(app)
      .post('/emprunts')
      .send({ userName: 'Oussama', bookId: '123' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEmprunt);
  });

  // ❌ book not available
  it('POST /emprunts should fail if book not available', async () => {
    const mockBook = { _id: '123', available: false };

    (axios.get as any).mockResolvedValue({ data: mockBook });

    const res = await request(app)
      .post('/emprunts')
      .send({ userName: 'Oussama', bookId: '123' });

    expect(res.status).toBe(400);
  });

  // ❌ book not found
  it('POST /emprunts should return 404 if book not found', async () => {
    (axios.get as any).mockRejectedValue({
      response: { status: 404 }
    });

    const res = await request(app)
      .post('/emprunts')
      .send({ userName: 'Oussama', bookId: '123' });

    expect(res.status).toBe(404);
  });

  // 🔄 return book
  it('PUT /emprunts/:id should return book', async () => {
    const mockEmprunt = {
      _id: '1',
      userName: 'Oussama',
      bookId: '123',
      save: vi.fn().mockResolvedValue(true),
    };

    (Emprunt.findById as any).mockResolvedValue(mockEmprunt);
    (axios.put as any).mockResolvedValue({});

    const res = await request(app).put('/emprunts/1');

    expect(res.status).toBe(200);
  });

  // ❌ not found
  it('PUT /emprunts/:id should return 404 if not found', async () => {
    (Emprunt.findById as any).mockResolvedValue(null);

    const res = await request(app).put('/emprunts/1');

    expect(res.status).toBe(404);
  });

});