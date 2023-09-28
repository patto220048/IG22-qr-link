import './LinkTree.scss';
import { menuIcon } from '../../svg/icon';
import { useState } from 'react';
function LinkTree(props) {
    // const [isFocus, setIsFocus] = useState(false)
    // console.log(isFocus)
    return (
        //custom link
        <div className="linktree" style={{
            backgroundColor:"aliceblue",
            borderRadius:"10px",
            }}>
            <a href="" className='linktree-link'>
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
