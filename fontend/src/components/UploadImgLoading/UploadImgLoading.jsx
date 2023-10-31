import './UploadImgLoading.scss';
import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { memo } from 'react';

function UploadImg({ imgPercent, resultImg }) {
    return (
        <section className="updaloadImg">
            {resultImg ? (
                <img className="updaloadImg-preview" src={resultImg?.avatar}></img>
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
