import './LinkTree.scss';
import { menuIcon } from '../../svg/icon';
import { useState ,memo} from 'react';

function LinkTree(props) {
    return (
        <div className="linktree" style={{
            backgroundColor:"aliceblue",
            borderRadius:"10px",    
            width:`${props.preview ? "230px": "500px"}`
            }}>
            <a href={props.link} className='linktree-link'>
                <div className="linktree-item" >
                    <p className="linktree-title">{props.title}</p>
                    <link rel="shortcut icon" href={props.icon} />
                    <span className="linktree-icon_menu">{menuIcon()}</span>
                </div>
            </a>
        </div>
  
    );
}

export default memo(LinkTree);
