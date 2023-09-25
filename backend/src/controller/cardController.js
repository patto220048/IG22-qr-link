
import Card from '../database/model/cardModel.js';
import handleErorr from '../error/handleError.js';
class cardController {
    //create card
    async newCard(req, res) {
        try {
            const newCard = new Card({ ...req.body});
            
            res.status(200).json(newCard);
            await newCard.save();
        } catch (error) {
            res.json(handleErorr(500, error));
        }
    }
    //get card
    async getCard(req, res) {
        const cardId = req.params.id
        
        try {
            const card = await Card.findById(cardId)
            res.status(200).json(card);
        } catch (error) {
            res.json(handleErorr(500, error));
            
        }
    }
    //add link
    async addLink(req, res) {
        
    }
}
export default new cardController();
