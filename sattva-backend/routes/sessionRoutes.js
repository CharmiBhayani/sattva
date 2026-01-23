import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import{
    createSession,
    getAllSessions,
    deleteSession
}from "../controllers/sessionController.js";

const router=express.Router();

router.post("/",authMiddleware, createSession);
router.get("/",authMiddleware, getAllSessions);
router.delete("/:id",deleteSession);


export default router;
