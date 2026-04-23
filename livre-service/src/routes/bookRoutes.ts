import express from "express";
import {
    getBooks,
    createBook,
    getBookById,
    updateBook} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.get("/:id", getBookById);
router.put("/:id", updateBook);

export default router;
