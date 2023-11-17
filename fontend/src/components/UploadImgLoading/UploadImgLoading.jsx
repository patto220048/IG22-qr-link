import './UploadImgLoading.scss';
import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { memo } from 'react';
import AvatarProfile from '../AvatarProfile/AvatarProfile';
import { useSelector } from 'react-redux';
function UploadImg({ imgPercent, resultImg, avtUser, themeBgUser, resultImgBg }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <>
            <section className="updaloadImg">
                {resultImg || avtUser || themeBgUser || resultImgBg ? (
                    <>
                        { themeBgUser || resultImgBg ? (
                            <>
                                <img
                                    className="updaloadImg-preview-bg"
                                    src={themeBgUser ? themeBgUser : resultImgBg?.background}
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
                        ) : (
                            <img className="updaloadImg-preview" src={avtUser ? avtUser : resultImg?.avatar}></img>
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
