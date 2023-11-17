import { imageUp } from '../../svg/icon';
import './BgImage.scss';
import { memo } from "react"

function BgImage({setIsPickImg,setopenGadient,setOpenColor}) {
    const handledOpen = () => {
        setopenGadient(false)
        setOpenColor(false)
        setIsPickImg(true)
    }
    return (
        <section className="BgImage" onClick={handledOpen}>
            <div className="BgImage-item"></div>
            <span className="BgImage-title">Image</span>
            <span className="imageUpSvg">
                {imageUp(35, 35)}
            </span>
        </section>
    );
}

export default memo(BgImage);
