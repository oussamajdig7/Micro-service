import { Request, Response } from "express";
import axios from "axios";
import Emprunt from "../models/Emprunt.js";

const BASE_URL = process.env.LIVRE_SERVICE_URL || "http://localhost:3001";

// GET
export const getEmprunts = async (req: Request, res: Response) => {
  const data = await Emprunt.find();
  res.json(data);
};

// CREATE
export const createEmprunt = async (req: Request, res: Response) => {
  try {
    const { userName, bookId } = req.body;

    let book;

    try {
      const bookRes = await axios.get(`${BASE_URL}/books/${bookId}`);
      book = bookRes.data;
    } catch (error: any) {
      // 🔥 handle 404 from livre-service
      if (error.response && error.response.status === 404) {
        return res.status(404).json({
          message: "Book not found in livre-service",
        });
      }

      return res.status(500).json({
        message: "Error communicating with livre-service",
      });
    }

    // check availability
    if (!book.available) {
      return res.status(400).json({ message: "Book not available" });
    }

    // update book first
    await axios.put(`${BASE_URL}/books/${bookId}`, {
      available: false,
    });

    const emprunt = await Emprunt.create({
      userName,
      bookId,
    });

    res.json(emprunt);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (return book)
export const updateEmprunt = async (req: Request, res: Response) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);

    if (!emprunt) {
      return res.status(404).json({ message: "Not found" });
    }

    emprunt.dateRetour = new Date();

    await axios.put(`${BASE_URL}/books/${emprunt.bookId}`, {
      available: true,
    });

    await emprunt.save();

    res.json(emprunt);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};