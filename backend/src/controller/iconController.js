import Icon from '../database/model/iconModel.js';

class IconController {
    //add link
    async addIcon(req, res) {
        const userId = req.params.userId;
        try {
            const newIcon = new Icon({ ...req.body, userId: userId });
            await newIcon.save();
            res.status(200).json(newIcon);
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
    //get links
    async getLinks(req, res) {
        const cardId = req.params.idCard;
        const currentUser = req.user.id;
        try {
            const card = await Card.findById(cardId);
            if (!card) return res.json(handleErorr(404, 'Card no have link.'));
            if (card.userId === currentUser) {
                try {
                    const getLinks = await Link.find({ cardId: cardId });
                    res.status(200).json(getLinks);
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            } else {
                res.json(handleErorr(403, 'You just get link your card!!'));
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
                    res.json(handleError(500, error.message));
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
                    await Link.findByIdAndDelete(linkId);
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
}
export default new IconController();
