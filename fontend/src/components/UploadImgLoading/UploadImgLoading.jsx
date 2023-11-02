import './UploadImgLoading.scss';
import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { memo } from 'react';
import { useSelector } from 'react-redux';

function UploadImg({ imgPercent, resultImg ,currentAvtImg}) {
    // const currentUser = useSelector((state => state.user.currentUser))

    return (
        <section className="updaloadImg">
            {resultImg || currentAvtImg ? (
                <img className="updaloadImg-preview" src={currentAvtImg ? currentAvtImg : resultImg?.avatar}></img>
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
    );
}

export default memo(UploadImg);
