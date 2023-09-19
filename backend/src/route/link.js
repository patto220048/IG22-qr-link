import express from "express";

const router = express.Router();


import linkController from "../controller/linkController.js";


router.post("/create/:username", linkController.createLink)

export default router
