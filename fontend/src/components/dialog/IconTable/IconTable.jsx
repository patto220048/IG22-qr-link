import SocialIconItem from '../../SocialIconItem/SocialIconItem';
import iconThemes from '../../../themes/icon';
import './IconTable.scss';
import { chevronRightIcon, searchIcon } from '../../../svg/icon';

function IconTable() {
    return (
        <section className="iconTable-container">
            <div className="iconTable-wapper">
                <h2 className="iconTable-title">Add Icon</h2>
                <div className="iconTable-input">
                    {searchIcon(23, 23)}
                    <input type="text" className="iconTable-search" />
                </div>
                <div className="iconTable-lists">
                    {iconThemes.map((iconTheme) => (
                        <>
                            <div className="iconTable-items">
                                <SocialIconItem icon={iconTheme.icon} key={iconTheme.id} />
                                <span className="iconTable-name">{iconTheme.iconName}</span>
                                {chevronRightIcon(25, 25)}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default IconTable;
