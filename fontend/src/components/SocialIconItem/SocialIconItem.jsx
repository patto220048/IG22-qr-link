
import './SocialIconItem.scss';
function SocialIconItem({icon}) {
    return (
        <div className="socialIconItem">
            <a href="http://">
                {icon}
            </a>
        </div>
    );
}

export default SocialIconItem;
