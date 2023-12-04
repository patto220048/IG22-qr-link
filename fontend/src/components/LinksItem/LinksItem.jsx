import { useState } from 'react';
import './LinksItem.scss';
import * as Switch from '@radix-ui/react-switch';
function LinksItem() {
    const [isSwith, setIsSwitch] = useState(false)
    console.log(isSwith)
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
                <div className="LinksItem-direct"></div>
            </div>
        </section>
    );
}

export default LinksItem;
