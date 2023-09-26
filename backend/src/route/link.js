import express from 'express';
import link from '../controller/linkController.js';
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();
// add link for card
router.post('/:idCard', userVerify.verifyUser, link.addLink);
// get link with a card
router.get('/:idCard', userVerify.verifyUser, link.getLinks);
// edit a link
router.put('/:id', userVerify.verifyUser, link.editLink);
// delete a link
router.delete('/:id', userVerify.verifyUser, link.deteleLink);

export default router;
