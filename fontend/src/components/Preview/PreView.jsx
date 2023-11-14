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

function PreView({ themeInstance, userIn, isLoading, theme, icons, user }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const themeLoading = useSelector((state) => state.theme.loading);
    return (
        <div className="PreView">
            <div className="PreView-wapper">
                {isLoading ? (
                    <Loading isLoading={isLoading} templateLoading={true} />
                ) : (
                    <>
                        {currentTheme?.backgroundImg ? (
                            <img
                                className="template-bg"
                                src={themeInstance?.backgroundImg ? themeInstance?.backgroundImg : theme?.backgroundImg}
                                alt={themeInstance?.backgroundImg ? themeInstance?.backgroundImg : theme?.backgroundImg}
                            />
                        ) : (
                            <div
                                className="template-bg"
                                style={{
                                    backgroundColor: `${
                                        themeInstance?.bgColor ? themeInstance?.bgColor : theme?.bgColor
                                    }`,
                                }}
                            />
                        )}
                        <section className="template-profile">
                            <AvatarProfile
                                preview={true}
                                username={userIn?.username ? userIn?.username : user?.username }
                                usernameTitle={userIn?.usernameTitle ? userIn?.usernameTitle : user?.usernameTitle}
                                decs={userIn?.decs ? userIn?.decs : user?.decs}
                                avatar={userIn?.avtImg ? userIn?.avtImg : user?.avtImg}
                                fontColor={theme?.fontColor ? theme?.fontColor : currentTheme?.font_color}
                            />

                            <SocialIconList icons={userIn?.groupIcon ? userIn?.groupIcon : icons} />

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
