import type { Request, Response } from 'express';
import Book from '../models/Book.js';

// GET all
export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find();
  res.json(books);
};

// POST
export const createBook = async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  res.json(book);
};

// GET by id
export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(book);
};

// UPDATE
export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(book);
};
