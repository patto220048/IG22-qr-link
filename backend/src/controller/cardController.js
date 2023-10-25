import { json } from 'express';
import Card from '../database/model/cardModel.js';
import Link from '../database/model/linksModel.js';
import handleErorr from '../error/handleError.js';
class cardController {
    //create card
    async newCard(req, res) {
        const curentUser = req.user.id;
        try {
            const card = await Card.findOne({userId: curentUser});
            console.log(card )
            if (card === null) {
                try {
                    const newCard = new Card({ ...req.body, userId: curentUser });
                    await newCard.save();
                    res.status(200).json(newCard);
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            }
            else{
                res.json({card , Error :handleErorr(500, "Your card has already existed.")})
            }
            
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
      
       
    }
    //get card
    async getCard(req, res) {
        const curentUser = req.user.id;
        try {
            if (curentUser) {
                try {
                    const allCard = await Card.findOne({ userId: curentUser });
                    res.status(200).json(allCard);
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            } else {
                res.json(handleErorr(403, 'Oop!!! You just get only your card.'));
            }
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    //get cards
    async getCards(req, res) {
        const cardId = req.params.id;
        try {
            const cards = await Card.find();
            res.status(200).json(...cards);
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    //edit card
    async editCard(req, res) {
        const curentUser = req.user.id;
        try {
            if (curentUser || req.user.admin) {
                try {
                    const newCard = await Card.findOneAndUpdate(
                        {userId: curentUser},
                        {
                            $set: req.body,
                        },
                        { new: true },
                    );
                    res.status(200).json(newCard);
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            } else {
                res.json(handleErorr(403, 'Oop!!! You just edit only your card.'));
            }
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    //detele cards
    async deleteCards(req, res) {
        try {
            const card = await Card.deleteMany();
            res.status(200).json('Delete successfuly!!');
        } catch (error) {
            res.json(handleError(500, error.message));
            
        }
    }
}
export default new cardController();
