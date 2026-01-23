import express from "express";
import {
  helloController,
  timeController,
  poseController
} from "../controllers/testControllers.js";

const router = express.Router();

// Using controllers
router.get("/", (req,res)=>{
  res.send({message: "Server of YogaVerse is Started!"});
});
router.get("/hello", helloController);
router.get("/time", timeController);
router.get("/pose/:name", poseController);

export default router;
