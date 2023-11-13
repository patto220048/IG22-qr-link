import SocialIconItem from '../../SocialIconItem/SocialIconItem';
import iconThemes from '../../../themes/icon';
import './IconTable.scss';
import { chevronRightIcon, searchIcon } from '../../../svg/icon';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function IconTable({ setOpenInputUrl, setSocialIconName , setClearIcon}) {
    const [query, setQuery] = useState('');
    const handleOpenInput = (props) => {
        setOpenInputUrl(true);
        setSocialIconName(props.iconName);
        setClearIcon(false)
    };
    const {groupIcon} = useSelector((state)=> state.user.currentUser)
    return (
        <section className="iconTable-container">
            <div className="iconTable-wapper">
                <h2 className="iconTable-title">Add Icon</h2>
                <div className="iconTable-input">
                    {searchIcon(23, 23)}
                    <input
                        type="search"
                        className="iconTable-search"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                    />
                </div>
                <div className="iconTable-lists">
                    {iconThemes
                        .filter((iconTheme) => iconTheme.iconName.toLowerCase().includes(query))
                        .map((iconTheme) => (
                            <section key={iconTheme.id} >
                                <div className="iconTable-items" onClick={() => handleOpenInput(iconTheme)}>
                                    <SocialIconItem iconTheme={iconTheme.icon} />
                                    <span className="iconTable-name">{iconTheme.iconName}</span>
                                    {groupIcon?.map((icon,index) => (
                                        icon.iconName === iconTheme.iconName && <p className="iconTable-added" key={index}>Added</p>
                                    ))}
                                    {chevronRightIcon(25, 25)}
                                </div>
                            </section>
                        ))}
                </div>
            </div>
        </section>
    );
}

export default IconTable;
