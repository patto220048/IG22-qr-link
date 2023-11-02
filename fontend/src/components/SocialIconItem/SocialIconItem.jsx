import './SocialIconItem.scss';
import { SocialIcon } from 'react-social-icons';

function SocialIconItem() {
    return (
        <div className="socialIconItem">
            <a href="https://www.figma.com/files/recents-and-sharing/recently-viewed?fuid=1239730375145362701">
                <SocialIcon network="github" className="colorscheme" style={{ color: 'green' }} />
            </a>
        </div>
    );
}

export default SocialIconItem;
