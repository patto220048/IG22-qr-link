import express from "express";

const router = express.Router();


import qrController from "../controller/qrController.js";


router.get("/test", qrController.test)

export default router
