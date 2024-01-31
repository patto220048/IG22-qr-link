import { useEffect, useState } from 'react';
import AvatarProfile from '../AvatarProfile/AvatarProfile';
import PreView from '../Preview/PreView';
import SocialIconList from '../SocialIconlist/SocialIconList';
import LinkTree from '../linktree/LinkTree';
import './CommunityItem.scss';
import http from '../../instance/axiosInstance';
import { LazyLoadImage } from 'react-lazy-load-image-component';
function CommunityItem({ user }) {
    const [theme, setTheme] = useState({});
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fectchTheme = async () => {
            try {
                const res = await http.get(`/card/v1/${user?._id}`);
                setTheme(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fectchTheme();
    }, [user?._id]);

    useEffect(() => {
        const fectchUrl = async () => {
            try {
                const res = await http.get(`/link/${user?._id}`);
                setUrls(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fectchUrl();
    }, [user?._id]);
    return (
        <section className="CommunityItem">
            {theme?.backgroundImg || theme?.backgroundVideo ? (
                <>
                    {theme?.backgroundVideo ? (
                        <video
                            className="template-bg"
                            type="video/webm"
                            loop
                            autoPlay
                            muted 
                            src={theme?.backgroundVideo}
                        ></video>
                    ) : (
                        <LazyLoadImage
                            className="template-bg"
                            src={theme?.backgroundImg}
                            effect="blur"
                            alt={theme?.backgroundImg}
                        />

                        // <img
                        //     className="template-bg"
                        //     src={theme?.backgroundImg}
                        //     alt={theme?.backgroundImg}
                        //     loading="lazy"
                        // />
                    )}
                </>
            ) : (
                <>
                    {theme?.gadientColorBot || theme?.gadientColorTop ? (
                        <>
                            {theme?.gadientColorTop && theme?.gadientColorBot ? (
                                <div
                                    className="template-bg"
                                    style={{
                                        backgroundImage: `linear-gradient(${theme?.gadientColorTop},${theme?.gadientColorBot})`,
                                    }}
                                />
                            ) : (
                                <div
                                    className="template-bg"
                                    style={
                                        {
                                            backgroundColor: `${theme?.gadientColorBot || theme?.gadientColorTop}`,
                                        }

                                        // backgroundImage:`linear-gradient(${currentTheme.gadientColorTop || theme?.gadientColorTop },${currentTheme.gadientColorBot || theme?.gadientColorTop  })`
                                    }
                                />
                            )}
                        </>
                    ) : (
                        <div
                            className="template-bg"
                            style={{
                                backgroundColor: `${theme?.bgColor}`,
                            }}
                        />
                    )}
                </>
            )}

            <div className="template-profile" aria-disabled={true}>
                <AvatarProfile
                    user={user}
                    commu={true}
                    theme={theme}
                    preview={true}
                    usernameTitle={user.usernameTitle}
                    decs={user.decs}
                    avatar={user.avtImg}
                    username={user.username}
                    fontColor={theme?.font_color}
                />
                <div className="template-icon">
                    <SocialIconList icons={user?.groupIcon} commu={true} />
                </div>
                <div className="template-info-items">
                    {urls?.length > 0 ? (
                        urls?.map(
                            (url, index) =>
                                url.cardId === theme?._id && (
                                    <LinkTree
                                        commu={true}
                                        key={index}
                                        theme={theme}
                                        preview={true}
                                        title={url.urlTitle}
                                        icon={url.urlThumbnail}
                                        thumbnailImage={url.thumbnailImage}
                                        link={url.url}
                                        acticve={url.acticve}
                                        decs={url.decs}
                                        headerStyte={url.headerStyle}
                                    />
                                ),
                        )
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CommunityItem;
