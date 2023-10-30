import './Dialog_file.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon } from '../../../svg/icon';
import { useEffect, useState } from 'react';
import UploadImg from '../../UploadImg/UploadImg';
// import Dialog_content from './dialog_contens/Dialog_contents';
function Dialog_content({ avatar, setAvatar, resultImg, setResultImg }) {
    return (
        <>
            {avatar ? (
                <UploadImg avatarFile={avatar} resultImg={resultImg} setResultImg={setResultImg} />
            ) : (
                <>
                    <Dialog.Title className="DialogTitle">Add image</Dialog.Title>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="upload-photo">
                            {imgIcon(30, 30)} File/Image
                        </label>
                        <input type="file" id="upload-photo" onChange={(e) => setAvatar(e.target.files[0])} />
                    </fieldset>
                </>
            )}
        </>
    );
}

export default Dialog_content;
