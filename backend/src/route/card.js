import express from 'express';

import card from '../controller/cardController.js';
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();
//create a new card
router.post('/', userVerify.verifyUser, card.newCard);
//get card
router.get('/:id', userVerify.verifyUser, card.getCard);
//edit card
router.put('/:id', userVerify.verifyUser, card.editCard);
//get cards
router.get('/', userVerify.verifyUser, card.getCards);

export default router;
