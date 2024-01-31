import { useState } from 'react';
import './FontTableItem.scss';

function FontTableItem({ fontClassicName, fontWeight, setFontFamily, index, setActive, active }) {
    const handleSelectFont = (fontFamily, fontWeight) => {
        setFontFamily({ family: fontFamily, weight: fontWeight });
        // setIsFonts(false);
    };
 

    return (
        <div
            className="FontTableItem"
            onClick={() => {
                handleSelectFont(fontClassicName, fontWeight);
            }}
        >
            <span
                className={'FontTableItem-name ' + (active === index ? 'active' : '')}
                style={{
                    fontFamily: `${fontClassicName}`,
                    fontWeight: `${fontWeight}`,
                }}
                onClick={() => setActive(index)}
            >
                {fontClassicName}
            </span>
        </div>
    );
}

export default FontTableItem;
