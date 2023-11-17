import { imageUp } from '../../svg/icon';
import './BgImage.scss';

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
            <span span className="imageUpSvg">
                {imageUp(35, 35)}
            </span>
        </section>
    );
}

export default BgImage;
