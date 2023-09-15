import User from '../database/model/userModel';
import handleError from '../error/handleError'
class UserController {
    //User
    getUser(req,res){
        res.send('hello first route')
    }
}
export default new UserController();