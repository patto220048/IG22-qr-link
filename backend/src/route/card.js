import express from "express";

import card from "../controller/cardController.js";
const router = express.Router();


//create a new card
router.post('/', card.newCard)
//get card
router.get('/:id', card.getCard)



export default router
