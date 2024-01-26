import { useSelector } from 'react-redux';
import './PreView.scss';
import AvatarProfile from '../AvatarProfile/AvatarProfile';
import SocialIconList from '../SocialIconlist/SocialIconList';
import LinkTree from '../linktree/LinkTree';
import Loading from '../dialog/loading/Loading';
import { facebookIcon, instagramIcon, youtubeIcon } from '../../svg/social';
import { memo, useState } from 'react';
import PreViewContact from '../PreviewContact/PreviewContact';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function PreView({ userIn, isLoading, theme, icons, user, links }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const themeLoading = useSelector((state) => state.theme.loading);
    const userLoading = useSelector((state) => state.user.loading);
    const currentLink = useSelector((state) => state.url.currentUrl);
    const [isContact, setIsContact] = useState(false);
    return (
        <>
            <div className="PreView-wapper">
                {isContact && <PreViewContact setIsContact={setIsContact} preview={true} window={false} />}
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
                                        style={
                                            currentLink?.length > 4 === true ? { height: '100vh' } : { height: '100%' }
                                        }
                                        className="template-bg"
                                        type="video/webm"
                                        loop
                                        autoPlay
                                        muted
                                        src={
                                            currentTheme?.backgroundVideo
                                                ? currentTheme?.backgroundVideo
                                                : theme?.backgroundVideo
                                        }
                                    ></video>
                                ) : (
                                    <LazyLoadImage
                                        className="template-bg"
                                        style={
                                            currentLink?.length > 4 === true ? { height: '100vh' } : { height: '100%' }
                                        }
                                        src={
                                            currentTheme?.backgroundImg
                                                ? currentTheme?.backgroundImg
                                                : theme?.backgroundImg
                                        }
                                        effect="blur"
                                        alt={
                                            currentTheme?.backgroundImg
                                                ? currentTheme?.backgroundImg
                                                : theme?.backgroundImg
                                        }
                                    />
                                    // <img
                                    //     className="template-bg"
                                    //     style={
                                    //         currentLink?.length > 4 === true ? { height: '100vh' } : { height: '100%' }
                                    //     }
                                    //     src={
                                    //         currentTheme?.backgroundImg
                                    //             ? currentTheme?.backgroundImg
                                    //             : theme?.backgroundImg
                                    //     }
                                    //     alt={
                                    //         currentTheme?.backgroundImg
                                    //             ? currentTheme?.backgroundImg
                                    //             : theme?.backgroundImg
                                    //     }
                                    //     loading="lazy"
                                    // />
                                )}
                            </>
                        ) : (
                            <>
                                {currentTheme?.gadientColorBot ||
                                currentTheme?.gadientColorTop ||
                                theme?.gadientColorBot ||
                                theme?.gadientColorTop ? (
                                    <>
                                        {(currentTheme?.gadientColorBot && currentTheme?.gadientColorTop) ||
                                        (theme?.gadientColorTop && theme?.gadientColorBot) ? (
                                            <div
                                                className="template-bg"
                                                style={
                                                    currentLink?.length > 4 === true
                                                        ? {
                                                              height: '100vh',

                                                              backgroundImage: `linear-gradient(${
                                                                  currentTheme?.gadientColorTop ||
                                                                  theme?.gadientColorTop
                                                              },${
                                                                  currentTheme?.gadientColorBot ||
                                                                  theme?.gadientColorBot
                                                              })`,
                                                          }
                                                        : {
                                                              height: '100%',

                                                              backgroundImage: `linear-gradient(${
                                                                  currentTheme?.gadientColorTop ||
                                                                  theme?.gadientColorTop
                                                              },${
                                                                  currentTheme?.gadientColorBot ||
                                                                  theme?.gadientColorBot
                                                              })`,
                                                          }
                                                }
                                            />
                                        ) : (
                                            <div
                                                className="template-bg"
                                                style={
                                                    currentLink?.length > 4 === true
                                                        ? {
                                                              height: '100vh',

                                                              backgroundColor: `${
                                                                  currentTheme?.gadientColorBot ||
                                                                  currentTheme?.gadientColorTop ||
                                                                  theme?.gadientColorBot ||
                                                                  theme?.gadientColorTop
                                                              }`,
                                                          }
                                                        : {
                                                              height: '100%',

                                                              backgroundColor: `${
                                                                  currentTheme?.gadientColorBot ||
                                                                  currentTheme?.gadientColorTop ||
                                                                  theme?.gadientColorBot ||
                                                                  theme?.gadientColorTop
                                                              }`,
                                                          }

                                                    // backgroundImage:`linear-gradient(${currentTheme.gadientColorTop || theme?.gadientColorTop },${currentTheme.gadientColorBot || theme?.gadientColorTop  })`
                                                }
                                            />
                                        )}
                                    </>
                                ) : (
                                    <div
                                        className="template-bg"
                                        style={
                                            currentLink?.length > 4 === true
                                                ? {
                                                      height: '100vh',
                                                      backgroundColor: `${
                                                          currentTheme?.bgColor ? currentTheme?.bgColor : theme?.bgColor
                                                      }`,
                                                  }
                                                : {
                                                      height: '100%',

                                                      backgroundColor: `${
                                                          currentTheme?.bgColor ? currentTheme?.bgColor : theme?.bgColor
                                                      }`,
                                                  }
                                        }
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
                            <div className="template-info-items">
                                <SocialIconList
                                    icons={currentUser?.groupIcon ? currentUser?.groupIcon : icons}
                                    commu={false}
                                />

                                {currentLink?.map((url, index) => (
                                    <LinkTree
                                        cummu={false}
                                        window={false}
                                        preview={true}
                                        isMobile={false}
                                        setIsContact={setIsContact}
                                        title={url.urlTitle}
                                        icon={url.urlThumbnail}
                                        thumbnailImage={url.thumbnailImage}
                                        link={url.url}
                                        key={index}
                                        acticve={url.acticve}
                                        decs={url.decs}
                                        headerStyte={url.headerStyle}
                                    />
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
}

export default memo(PreView);
