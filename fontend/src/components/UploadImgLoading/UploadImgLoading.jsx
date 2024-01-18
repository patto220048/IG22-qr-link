import './UploadImgLoading.scss';
import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { memo } from 'react';
import AvatarProfile from '../AvatarProfile/AvatarProfile';
import { useSelector } from 'react-redux';
import Loading from '../dialog/loading/Loading';
function UploadImg({
    imgPercent,
    resultImg,
    avtUser,
    themeBgUser,
    resultImgBg,
    resultVideo,
    themeBgUserVideo,
    resultThumb,
    thumbnailUser,
}) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    return (
        <>
            <section className="updaloadImg">
                {resultImg ||
                avtUser ||
                resultImgBg ||
                resultVideo ||
                themeBgUserVideo ||
                themeBgUser ||
                resultThumb ||
                thumbnailUser ? (
                    <>
                        {resultThumb && (
                            <img className="updaloadImg-preview" src={resultThumb?.thumbnail} loading="lazy"></img>
                        )}
                        {thumbnailUser && (
                            <img className="updaloadImg-preview" src={thumbnailUser} loading="lazy"></img>
                        )}
                        {resultImg && (
                            <img className="updaloadImg-preview" src={resultImg?.avatar} loading="lazy"></img>
                        )}

                        {avtUser && <img className="updaloadImg-preview" src={avtUser} loading="lazy"></img>}

                        {resultImgBg && (
                            <>
                                <img
                                    className="updaloadImg-preview-bg"
                                    src={resultImgBg?.background}
                                    loading="lazy"
                                ></img>

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

                        {themeBgUser && (
                            <>
                                <img className="updaloadImg-preview-bg" src={themeBgUser} loading="lazy"></img>

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

                        {resultVideo && (
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
                        )}

                        {themeBgUserVideo && (
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
