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
    async getIcon(req, res) {
        const currentUser = req.user.id;
        try {
            const icon  = await Icon.find({userId: currentUser})
            res.status(200).json(icon);

        } catch (error) {
            res.json(handleErorr(500, error.message));
            
        }
    
    }
    //edit link
    async editIcon(req, res) {
        const iconId = req.params.id;
        try {
            const icon = await Icon.findById(iconId);
            if (!icon) return res.json(handleErorr(404, 'This link not found.'));
            if (icon.userId === req.user.id) {
                try {
                    const newIcon = await Icon.findByIdAndUpdate(
                        iconId,
                        {
                            $set: req.body,
                        },
                        { new: true },
                    );
                    res.status(200).json(newIcon);
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
    async deteleIcon(req, res) {
        const iconId = req.params.id;
        try {
            const icon = await Icon.findById(iconId);
            if (!icon) return res.json(handleErorr(404, 'This icon not found.'));
            if (icon.userId === req.user.id) {
                try {
                    await Icon.findByIdAndDelete(iconId);
                    res.status(200).json('Delete successfuly!!');
                } catch (error) {
                    res.json(handleErorr(500, error.message));
                }
            } else {
                res.json(handleErorr(403, 'Oop!!! You just delete only your icon'));
            }
        } catch (error) {
            res.json(handleErorr(500, error.message));
        }
    }
}
export default new IconController();
