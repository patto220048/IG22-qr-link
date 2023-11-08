
import './SocialIconItem.scss';
import iconSvgs from "../../themes/icon"
import { useSelector } from 'react-redux';
function SocialIconItem({iconName,iconUrl,iconTheme}) {
    return (
        <div className="socialIconItem">
        { !iconTheme ?
           <a href={iconUrl}>
                {iconSvgs.map((iconSvg, index)=>(
                    iconSvg.iconName === iconName && <span key={index}>{iconSvg.icon}</span>
                ))}
            </a>
            :
            iconTheme
            }
        </div>
    );
}

export default SocialIconItem;
