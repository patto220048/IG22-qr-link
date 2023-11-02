
import SocialIconItem from '../SocialIconItem/SocialIconItem';
import "./SocialIconList.scss"
function SocialIconList() {
    return (
        <div className="socialIcon">
            <div className="socialIcon-group">
                <SocialIconItem />
                <SocialIconItem />
                <SocialIconItem />
                <SocialIconItem />
                <SocialIconItem />
            </div>
        </div>
    );
}

export default SocialIconList;
