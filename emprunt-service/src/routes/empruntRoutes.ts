import express from "express";
import {
  getEmprunts,
  createEmprunt,
  updateEmprunt,
} from "../controllers/empruntController.js";

const router = express.Router();

router.get("/", getEmprunts);
router.post("/", createEmprunt);
router.put("/:id", updateEmprunt);

export default router;