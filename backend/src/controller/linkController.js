import Link from '../database/model/linksModel.js';
import Card from '../database/model/cardModel.js';
import handleErorr from '../error/handleError.js';
class LinkController {
    //add link
    async addLink(req, res) {
        const cardId = req.params.idCard;
        const currentUser = req.user.id;
        try {
            const card = await Card.findById(cardId);
            if (!card) return res.json(handleErorr(404, 'Card not found !!!'));
            if (card.userId === currentUser) {
                try {
                    const newLink = new Link({ ...req.body, cardId: cardId, userId: currentUser });
                    await newLink.save();
                    res.status(200).json(newLink);
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            } else {
                res.json(handleErorr(403, 'You just add link your card.'));
            }
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    //get links
    async getLinks(req, res, next) {
        const userId = req.params.userId;
        try {
            try {
                const getLinks = userId && await Link.find({ userId: userId });
                return res.status(200).json(getLinks);
            } catch (error) {
                res.json(handleErorr(500, error.message));
            }
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    //edit link
    async editLink(req, res) {
        const linkId = req.params.id;
        try {
            const link = await Link.findById(linkId);
            if (!link) return res.json(handleErorr(404, 'This link not found.'));
            if (link.userId === req.user.id) {
                try {
                    const newLink = await Link.findByIdAndUpdate(
                        linkId,
                        {
                            $set: req.body,
                        },
                        { new: true },
                    );
                    res.status(200).json(newLink);
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            } else {
                res.json(handleErorr(403, 'Oop!!! You just edit only your link.'));
            }
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    //delete a link
    async deteleLink(req, res) {
        const linkId = req.params.id;
        try {
            const link = await Link.findById(linkId);
            if (!link) return res.json(handleErorr(404, 'This link not found.'));
            if (link.userId === req.user.id) {
                try {
                    const link = await Link.findByIdAndDelete(linkId);
                    res.status(200).json('Delete successfuly!!');
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            } else {
                res.json(handleErorr(403, 'Oop!!! You just delete only your link'));
            }
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    async getAllLink(req, res, next) {
        try {
            const link = await Link.find();
            res.status(200).json(link);
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    async deteleAllLink(req, res, next) {
        try {
            const link = await Link.deleteMany();
            res.status(200).json('Delete successfuly!!');
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
}
export default new LinkController();
