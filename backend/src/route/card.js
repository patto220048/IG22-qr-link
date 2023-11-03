import express from 'express';

import card from '../controller/cardController.js';
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();
//create a new card
router.post('/', userVerify.verifyUser, card.newCard);
//get card
router.get('/v1/:userId', card.getCard);
//edit card
router.put('/:id', userVerify.verifyUser, card.editCard);
//get cards
router.get('/', userVerify.verifyUser, card.getCards);
//delete cards
router.delete('/', userVerify.verifyUser, card.deleteCards);

export default router;
