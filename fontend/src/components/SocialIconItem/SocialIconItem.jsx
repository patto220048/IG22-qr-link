import './SocialIconItem.scss';
import iconSvgs from '../../themes/icon';
import { useSelector } from 'react-redux';
import { memo } from 'react';
function SocialIconItem({ iconName, iconUrl, iconTheme, commu }) {
    return (
        <div className="socialIconItem">
            {!iconTheme ? (
                <a href={iconUrl} target="blank" style={commu ? { pointerEvents: 'none' } : { pointerEvents: '' }}>
                    {iconSvgs.map(
                        (iconSvg, index) => iconSvg.iconName === iconName && <span key={index}>{iconSvg.icon}</span>,
                    )}
                </a>
            ) : (
                iconTheme
            )}      
        </div>
    );
}       

export default memo(SocialIconItem);
