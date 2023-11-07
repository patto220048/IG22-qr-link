
import './SocialIconItem.scss';
import iconSvgs from "../../themes/icon"
import { useSelector } from 'react-redux';
function SocialIconItem({iconName,iconUrl,iconTheme}) {
    const currentIcon = useSelector((state)=> state.icon.currentIcon)
    console.log(currentIcon)
    return (
        <div className="socialIconItem">
        { !iconTheme ?
           <a href={iconUrl}>
                {iconSvgs.map((iconSvg)=>(
                    iconSvg.iconName === (currentIcon ? currentIcon.iconName : iconName) && iconSvg.icon
                ))}
            </a>
            :
            iconTheme
            }
        </div>
    );
}

export default SocialIconItem;
