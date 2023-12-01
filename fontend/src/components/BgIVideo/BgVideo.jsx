import { videoIcon } from '../../svg/icon';
import './BgVideo.scss';

function BgVideo({setIsPickImgVideo}) {
    const handledOpen = () => {
        setIsPickImgVideo(true)
    };
    return (
        <section className="BgVideo" onClick={handledOpen}>
            <div className="BgVideo-item"></div>
            <span className="BgVideo-title">Video</span>
            <span className="VideoUpSvg">{videoIcon(35, 35)}</span>
        </section>
    );
}

export default BgVideo;
