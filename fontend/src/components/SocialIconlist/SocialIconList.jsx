
import SocialIconItem from '../SocialIconItem/SocialIconItem';
import "./SocialIconList.scss"
function SocialIconList({icons}) {
  
    return (
        <div className="socialIcon">
            <div className="socialIcon-group">
                {icons.map((icon,index)=>(
                    <SocialIconItem iconName={icon.iconName} iconUrl={icon.iconUrl} key={icon._id}/>
                ))}
            </div>
        </div>
    );
}

export default SocialIconList;
