
import SocialIconItem from '../SocialIconItem/SocialIconItem';
import "./SocialIconList.scss"
import {memo} from "react"
function SocialIconList({icons}) {
    console.log(icons)
    return (
        <div className="socialIcon">
            <div className="socialIcon-group">
                {icons?.map((icon,index)=>(
                    <SocialIconItem iconName={icon.iconName} iconUrl={icon.iconUrl} key={icon._id}/>
                ))}
            </div>
        </div>
    );
}

export default memo(SocialIconList);
