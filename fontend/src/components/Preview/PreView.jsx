import { useSelector } from 'react-redux';
import './PreView.scss';
import AvatarProfile from '../AvatarProfile/AvatarProfile';
import SocialIconList from '../SocialIconlist/SocialIconList';
import LinkTree from '../linktree/LinkTree';
import Loading from '../dialog/loading/Loading';
import { facebookIcon, instagramIcon, youtubeIcon } from '../../svg/social';
import { memo } from 'react';

function PreView({ userIn, isLoading, theme, icons, user }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const themeLoading = useSelector((state) => state.theme.loading);
    const userLoading = useSelector((state) => state.user.loading);
    const currentLink = useSelector((state)=> state.url.currentUrl)

    return (
        <div className="PreView">
            <div className="PreView-wapper">
                {themeLoading || userLoading ? (
                    <Loading isLoading={themeLoading || userLoading} templateLoading={true} />
                ) : (
                    <>
                        {currentTheme?.backgroundImg ||
                        theme?.backgroundImg ||
                        currentTheme?.backgroundVideo ||
                        theme?.backgroundVideo ? (
                            <>
                                {currentTheme?.backgroundVideo || theme?.backgroundVideo ? (
                                    <video
                                        className="template-bg"
                                        type="video/webm"
                                        loop
                                        autoPlay
                                        src={
                                            currentTheme?.backgroundVideo
                                                ? currentTheme?.backgroundVideo
                                                : theme?.backgroundVideo
                                        }
                                    ></video>
                                ) : (
                                    <img
                                        className="template-bg"
                                        src={
                                            currentTheme?.backgroundImg
                                                ? currentTheme?.backgroundImg
                                                : theme?.backgroundImg
                                        }
                                        alt={
                                            currentTheme?.backgroundImg
                                                ? currentTheme?.backgroundImg
                                                : theme?.backgroundImg
                                        }
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {currentTheme.gadientColorBot ||
                                currentTheme.gadientColorTop ||
                                theme?.gadientColorBot ||
                                theme?.gadientColorTop ? (
                                    <>
                                        {(currentTheme?.gadientColorBot && currentTheme?.gadientColorTop) ||
                                        (theme?.gadientColorTop && theme?.gadientColorBot) ? (
                                            <div
                                                className="template-bg"
                                                style={{
                                                    backgroundImage: `linear-gradient(${
                                                        currentTheme.gadientColorTop || theme?.gadientColorTop
                                                    },${currentTheme.gadientColorBot || theme?.gadientColorBot})`,
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="template-bg"
                                                style={{
                                                    backgroundColor: `${
                                                        currentTheme.gadientColorBot ||
                                                        currentTheme.gadientColorTop ||
                                                        theme?.gadientColorBot ||
                                                        theme?.gadientColorTop
                                                    }`,
                                                    // backgroundImage:`linear-gradient(${currentTheme.gadientColorTop || theme?.gadientColorTop },${currentTheme.gadientColorBot || theme?.gadientColorTop  })`
                                                }}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <div
                                        className="template-bg"
                                        style={{
                                            backgroundColor: `${
                                                currentTheme?.bgColor ? currentTheme?.bgColor : theme?.bgColor
                                            }`,
                                        }}
                                    />
                                )}
                            </>
                        )}
                        <section className="template-profile">
                            <AvatarProfile
                                preview={true}
                                username={currentUser?.username ? currentUser?.username : user?.username}
                                usernameTitle={
                                    currentUser?.usernameTitle ? currentUser?.usernameTitle : user?.usernameTitle
                                }
                                decs={currentUser?.decs ? currentUser?.decs : user?.decs}
                                avatar={currentUser?.avtImg ? currentUser?.avtImg : user?.avtImg}
                                fontColor={theme?.fontColor ? theme?.fontColor : currentTheme?.font_color}
                            />

                            <SocialIconList icons={currentUser?.groupIcon ? currentUser?.groupIcon : icons} />

                            {currentLink.map((url,index)=>(
                                <LinkTree preview={true} title={url.urlTitle} icon={url.urlThumbnail} link={url.url} />
                            ))}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

export default memo(PreView);
