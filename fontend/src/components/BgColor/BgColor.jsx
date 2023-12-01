import './BgColor.scss';
import { memo } from 'react';
function BgColor({openColor, setOpenColor, setopenGadient}) {
    const handledOpen = () => {
        setOpenColor(true)
        setopenGadient(false)
    }   
    return (
        <>
        <section className="BackgroundColor" onClick={handledOpen}>
            <div className="BackgroundColor-item"></div>
            <span className="BackgroundColor-title">Background Color </span>
        </section>
        </>
    );
}

export default memo(BgColor);
