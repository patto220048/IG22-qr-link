import { useSelector } from 'react-redux';
import './PreView.scss';
import AvatarProfile from '../avatarProfile/AvatarProfile';
import SocialIconList from '../SocialIconlist/SocialIconList';
import LinkTree from '../linktree/LinkTree';
import Loading from '../dialog/loading/Loading';
import { facebookIcon, instagramIcon, youtubeIcon } from '../../svg/social';
import http from '../../instance/axiosInstance';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PreView({ userIn, isLoading, theme, icons, user }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const themeLoading = useSelector((state) => state.theme.loading);
    const userLoading = useSelector((state) => state.user.loading);
    return (
        <div className="PreView">
            <div className="PreView-wapper">
                {themeLoading || userLoading ? (
                    <Loading isLoading={themeLoading || userLoading} templateLoading={true} />
                ) : (
                    <>
                        {currentTheme?.backgroundImg || theme?.backgroundImage ? (
                            <img
                                className="template-bg"
                                src={currentTheme?.backgroundImg ? currentTheme?.backgroundImg : theme?.backgroundImg}
                                alt={currentTheme?.backgroundImg ? currentTheme?.backgroundImg : theme?.backgroundImg}
                            />
                        ) : (
                            <>
                                {currentTheme.gadientColorBot ||
                                currentTheme.gadientColorTop ||
                                theme?.gadientColorBot ||
                                theme?.gadientColorTop ? (
                                    <>
                                        {(currentTheme.gadientColorBot && currentTheme.gadientColorTop) ||
                                        (theme?.gadientColorBot && theme?.gadientColorTop) ? (
                                            <div
                                                className="template-bg"
                                                style={{
                                                    backgroundImage: `linear-gradient(${
                                                        currentTheme.gadientColorTop || theme?.gadientColorTop
                                                    },${currentTheme.gadientColorBot || theme?.gadientColorTop})`,
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

                            <LinkTree
                                preview={true}
                                title={'Facebook'}
                                icon={facebookIcon(35, 35)}
                                link="https://www.facebook.com/"
                            />
                            <LinkTree preview={true} title={'Youtube'} icon={youtubeIcon(35, 35)} link="" />
                            <LinkTree preview={true} title={'Instagram'} icon={instagramIcon(35, 35)} />
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

export default PreView;
