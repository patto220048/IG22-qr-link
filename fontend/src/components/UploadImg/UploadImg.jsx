import './UploadImg.scss';

import { useEffect, useState, memo } from 'react';
import Loading from '../dialog/loading/Loading';

function UploadImg({ imgPercent, resultImg }) {
    return (
        <section className="updaloadImg">
            {resultImg ? <img className="updaloadImg-preview" src={resultImg?.avatar}></img> : imgPercent + '%'}
        </section>
    );
}

export default memo(UploadImg);
