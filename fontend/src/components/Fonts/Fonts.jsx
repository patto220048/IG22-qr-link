import { useState } from 'react';
import './Fonts.scss';
import Dialog_IU from '../dialog/Dialog_IU';
import { useSelector } from 'react-redux';

function Fonts({ theme }) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [isFonts, setIsFonts] = useState(false);
    const handleOpenFonts = () => {
        setIsFonts(true);
    };
    return (
        <div className="Fonts">
            <dir className="Font-items">
                <div className="Fonts-select">
                    <span className="Fonts-title">Font</span>
                    <button className="Fonts-btn" onClick={handleOpenFonts}>
                        <span
                            className="Font"
                            style={{
                                fontFamily: `${
                                    currentTheme.font_famify ? currentTheme.font_famify : theme.font_famify
                                }`,
                            }}
                        >
                            Aa
                        </span>
                        <span
                            className="Font-name"
                            style={{
                                fontFamily: `${
                                    currentTheme.font_famify ? currentTheme.font_famify : theme.font_famify
                                }`,
                                fontWeight: `${
                                    currentTheme.font_weight ? currentTheme.font_weight : theme.font_weight
                                }`,
                            }}
                        >
                            {currentTheme.font_famify ? currentTheme.font_famify : theme.font_famify}
                        </span>
                    </button>
                </div>
                {isFonts && (
                    <Dialog_IU
                        openDialog={isFonts}
                        setOpenDialog={setIsFonts}
                        isFonts={isFonts}
                        setIsFonts={setIsFonts}
                    />
                )}

                <div className="Fonts-color">
                    <span className="Fonts-title">Color</span>
                    <span className="Fonts-colorBox"></span>
                </div>
            </dir>
        </div>
    );
}

export default Fonts;
