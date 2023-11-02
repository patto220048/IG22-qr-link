import { facebookIcon } from '../../svg/social';
import './SocialIconItem.scss';
import { SocialIcon } from 'react-social-icons';

function SocialIconItem() {
    return (
        <div className="socialIconItem">
            <a href="https://www.figma.com/files/recents-and-sharing/recently-viewed?fuid=1239730375145362701">
                {facebookIcon(30,30)}
            </a>
        </div>
    );
}

export default SocialIconItem;
