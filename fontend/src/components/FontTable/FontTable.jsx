import FontTableItem from '../FontTableItem/FontTableItem';
import './FontTable.scss';
import fontClassics from '../../themes/fontClassics';
import { useState } from 'react';
import { useSelector } from 'react-redux';
function FontTable({ setIsFonts, setFontFamily, fontFamily }) {
    const [query, setQuery] = useState('');
    const [active, setActive] = useState();
    return (
        <div className="FontTable">
            <h2 className="FontTable-title">Seclect Font</h2>
            <input
                type="text"
                className="FontSearch"
                placeholder="Search "
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="FontTable-wapper">
                <div className="FontTable-items">
                    <h4 className="FontTable-type"> Classic</h4>
                    {fontClassics
                        .filter((fontClassic) => fontClassic.fontFamily.toLowerCase().includes(query))
                        .map((fontClassic, index) => (
                            <>  
                                <FontTableItem
                                    active={active}
                                    setActive={setActive}
                                    setFontFamily={setFontFamily}
                                    setIsFonts={setIsFonts}
                                    key={fontClassic.id}
                                    fontClassicName={fontClassic.fontFamily}
                                    fontWeight={fontClassic.fontWeight}
                                    index={index}
                                />
                            </>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default FontTable;
