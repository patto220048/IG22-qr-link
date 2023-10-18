import { facebookeIcon } from "../../svg/icon";
import "./SocialIcon.scss"

function SocialIcon() {
    return ( 
        <div className="socialIcon">
            <ul className="socialIcon-group">
                <li className="socialIcon-item">
                    {facebookeIcon(30,30)}
                </li>
                <li className="socialIcon-item">
                    {facebookeIcon(30,30)}
                </li>
                <li className="socialIcon-item">
                    {facebookeIcon(30,30)}
                </li>
            </ul>
        </div>
     );
}

export default SocialIcon;