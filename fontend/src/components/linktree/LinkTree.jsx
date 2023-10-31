import './LinkTree.scss';
import { menuIcon } from '../../svg/icon';
import { useState } from 'react';
function LinkTree(props) {
    // const [isFocus, setIsFocus] = useState(false)
    // console.log(isFocus)
    return (
        <div className="linktree" style={{
            backgroundColor:"aliceblue",
            borderRadius:"10px",    
            width:`${props.preview ? "90%": "100%"}`
            }}>
            <a href={props.link} className='linktree-link'>
                <div className="linktree-item" >
                    <p className="linktree-title">{props.title}</p>
                    <span className="linktree-icon">{props.icon}</span>
                    <span className="linktree-icon_menu">{menuIcon()}</span>
                </div>
            </a>
        </div>
  
    );
}

export default LinkTree;
