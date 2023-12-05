import { useState } from 'react';
import './LinksItem.scss';
import * as Switch from '@radix-ui/react-switch';
import {trashIcon} from "../../svg/icon"
function LinksItem() {
    const [isSwith, setIsSwitch] = useState(false)
    return (
        <section className="LinksItem">
            <div className="LinksItem-drag-icon"></div>
            <div className="LinksItem-wapper">
                <div className="LinksItem-item">
                    <div className="LinksItem-side">
                        <h4 className="LinkItem-name">Wiebo</h4>
                        <span className="LinkItem-link">https://m.weibo.cn/</span>
                    </div>
                    <div className="LinksItem-switch">
                        <Switch.Root className="SwitchRoot" id="airplane-mode">
                            <Switch.Thumb className="SwitchThumb" checked = {isSwith} onClick={()=> setIsSwitch(!isSwith)} />
                        </Switch.Root>
                    </div>
                </div>
                <ul className="LinksItem-direct">
                    <li className='LinksItem-direct-item'>1</li>
                    <li className='LinksItem-direct-item'>2</li>
                    <li className='LinksItem-direct-item'>3</li>
                    <li className='LinksItem-direct-item'>4</li>
                    <li className='LinksItem-direct-delete'>{trashIcon(25,25)}</li>

                </ul>
            </div>
        </section>
    );
}

export default LinksItem;
