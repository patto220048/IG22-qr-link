import express from "express";

const router = express.Router();


import testController from "../controller/testController.js";


router.get("/test", testController.test)

export default router
