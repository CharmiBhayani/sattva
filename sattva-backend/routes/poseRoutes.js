import express from "express";
import{
    getAllPoses,
    getPoseByName,
   
}from "../controllers/poseController.js";

const router=express.Router();

router.get("/",getAllPoses);
router.get("/:name",getPoseByName);


export default router;
