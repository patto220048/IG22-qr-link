import SocialIconItem from '../../SocialIconItem/SocialIconItem';
import iconThemes from '../../../themes/icon';
import './IconTable.scss';
import { chevronRightIcon, searchIcon } from '../../../svg/icon';
import { useState } from 'react';

function IconTable({setOpenInputUrl,setSocialName}) {
    const [query,setQuery] = useState("")
    const handleOpenInput =(props) => {
        setOpenInputUrl(true)
        setSocialName(props.iconName)
    }
    return (
        <section className="iconTable-container">
            <div className="iconTable-wapper">
                <h2 className="iconTable-title">Add Icon</h2>
                <div className="iconTable-input">
                    {searchIcon(23, 23)}
                    <input type="text" className="iconTable-search" onChange={(e)=>setQuery(e.target.value)} placeholder='Search' />
                </div>
                <div className="iconTable-lists" >
                    {iconThemes.filter((iconTheme)=>iconTheme.iconName.toLowerCase().includes(query)).map((iconTheme) => (
                        <section key={iconTheme.id} >
                            <div className="iconTable-items" onClick={()=>handleOpenInput(iconTheme)} >
                                <SocialIconItem icon={iconTheme.icon} />
                                <span className="iconTable-name">{iconTheme.iconName}</span>
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
