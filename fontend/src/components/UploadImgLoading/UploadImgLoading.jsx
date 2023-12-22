import './UploadImgLoading.scss';
import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { memo } from 'react';
import AvatarProfile from '../AvatarProfile/AvatarProfile';
import { useSelector } from 'react-redux';
import Loading from '../dialog/loading/Loading';
function UploadImg({ imgPercent, resultImg, avtUser, themeBgUser, resultImgBg, resultVideo, themeBgUserVideo }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const isLoading = useSelector((state) => state.theme.loading);
    return (
        <>
            <section className="updaloadImg">
                {resultImg ||
                avtUser ||
                resultImgBg ||
                resultVideo ||
                themeBgUserVideo ||
                currentTheme?.backgroundImg ? (
                    <>
                        {currentTheme?.backgroundImg || resultImgBg || resultVideo ? (
                            <>
                                {resultVideo?.video || themeBgUserVideo ? (
                                    <>
                                        <video
                                            controls
                                            autoPlay
                                            loop
                                            className="updaloadImg-video-bg"
                                            type="video/mp4"
                                            src={resultVideo?.video}
                                            loading="lazy"
                                        ></video>
                                        <div className="updaloadImg-avt-preview">
                                            <AvatarProfile
                                                preview={true}
                                                username={currentUser?.username}
                                                usernameTitle={currentUser?.usernameTitle}
                                                decs={currentUser?.decs}
                                                avatar={currentUser?.avtImg}
                                                fontColor={currentTheme?.currentTheme}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {isLoading ? (
                                           <Loading isLoading={isLoading} uploadImgLoading={true}/>
                                        ) : (
                                            <img
                                                className="updaloadImg-preview-bg"
                                                src={
                                                    resultImgBg?.background
                                                        ? resultImgBg?.background
                                                        : currentTheme?.backgroundImg
                                                }
                                                // loading='lazy'
                                            ></img>
                                        )}
                                        <div className="updaloadImg-avt-preview">
                                            <AvatarProfile
                                                preview={true}
                                                username={currentUser?.username}
                                                usernameTitle={currentUser?.usernameTitle}
                                                decs={currentUser?.decs}
                                                avatar={currentUser?.avtImg}
                                                fontColor={currentTheme?.currentTheme}
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            // set video preview when have in database
                            <>
                                {themeBgUserVideo ? (
                                    <>
                                        <video
                                            controls
                                            autoPlay
                                            loop
                                            className="updaloadImg-video-bg"
                                            type="video/mp4"
                                            src={themeBgUserVideo}
                                            loading="lazy"
                                        ></video>
                                        <div className="updaloadImg-avt-preview">
                                            <AvatarProfile
                                                preview={true}
                                                username={currentUser?.username}
                                                usernameTitle={currentUser?.usernameTitle}
                                                decs={currentUser?.decs}
                                                avatar={currentUser?.avtImg}
                                                fontColor={currentTheme?.currentTheme}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <img
                                        className="updaloadImg-preview"
                                        src={avtUser ? avtUser : resultImg?.avatar}
                                        loading="lazy"
                                    ></img>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <span className="updaloadImg-percent">{imgPercent}%</span>
                        <Progress.Root className="ProgressRoot" value={imgPercent}>
                            <Progress.Indicator
                                className="ProgressIndicator"
                                style={{ transform: `translateX(-${100 - imgPercent}%)` }}
                            />
                        </Progress.Root>
                    </>
                )}
            </section>
        </>
    );
}

export default memo(UploadImg);
