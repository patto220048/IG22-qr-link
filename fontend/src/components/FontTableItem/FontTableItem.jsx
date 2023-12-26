import { useState } from 'react';
import './FontTableItem.scss';

function FontTableItem({ fontClassicName, fontWeight, setFontFamily, index }) {
    const handleSelectFont = (fontFamily, fontWeight) => {
        setFontFamily({ family: fontFamily, weight: fontWeight });
        // setIsFonts(false);
       
    };
    const [active, setActve] = useState("");
    return (
        <div
            className="FontTableItem"
            onClick={() => {
                handleSelectFont(fontClassicName, fontWeight);
                setActve(index);
            }}
        >
            <span
                className={'FontTableItem-name ' + (active === index ? 'active' : 'unactive')}
                style={{
                    fontFamily: `${fontClassicName}`,
                    fontWeight: `${fontWeight}`,
                }}
            >
                {fontClassicName}
            </span>
        </div>
    );
}

export default FontTableItem;
