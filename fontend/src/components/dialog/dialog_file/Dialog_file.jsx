import './Dialog_file.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon, imageUp, upLoadVideo } from '../../../svg/icon';
import { useEffect, useState, memo } from 'react';
import app from '../../../firebase/config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import UploadImgLoading from '../../UploadImgLoading/UploadImgLoading';
import { useSelector } from 'react-redux';

// import Dialog_content from './dialog_contens/Dialog_contents';
function Dialog_content({
   
    setCurrentBackground,
    setResultImgBg,
    resultImgBg,
    themeBgUser,
    bgImage,
    setBgImage,
    avatar,
    setAvatar,
    resultImg,
    pickImg,
    setResultImg,
    setCurrentAvatar,
    avtUser,
    setImgUpLoading,
    pickImgBg,
    isBackground,
    isAvatar,
    pickImgVideo,
    bgVideo,
    setBgVideo,
    resultVideo,
    setResultVideo,
    setCurrentVideoBg,
    themeBgUserVideo,

}) {
    // image processing upload
    const [imgPercent, setImgPercent] = useState(0);
    //upload firebase storage
    const upload = (file, type) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file?.name;
        const storageRef = ref(storage, fileName);
        type === 'avatar' && setCurrentAvatar(fileName);
        type === 'background' && setCurrentBackground(fileName);
        type === 'video' && setCurrentVideoBg(fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                // console.log('Upload is ' + progress + '% done');
          
                type === 'avatar' && setImgPercent(Math.round(progress));
               
                type === 'background' && setImgPercent(Math.round(progress));

                type === 'video' && setImgPercent(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':

                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log('Upload error: ' + error.message);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    avatar &&
                        setResultImg((pre) => {
                            return { ...pre, [type]: downloadURL };
                        });
                    bgImage &&
                        setResultImgBg((pre) => {
                            return { ...pre, [type]: downloadURL };
                        });
                        bgVideo && 
                        setResultVideo((pre) => {
                            return { ...pre, [type]: downloadURL };
                        })
                });
            },
        );
    };
    useEffect(() => {
        avatar && (resultImg ? <></> : upload(avatar, 'avatar'));
    }, [avatar]);

    useEffect(() => {
        bgImage && (resultImgBg ? <></> : upload(bgImage, 'background'));
    }, [bgImage]);
    useEffect(() => {
        bgVideo && (resultVideo ? <></> : upload(bgVideo, 'video'));
    }, [bgVideo]);
    return (
        <>
            {avatar || avtUser || bgImage || themeBgUser || resultVideo || themeBgUserVideo ? (
                <UploadImgLoading
                    avtUser={avtUser}
                    resultImg={resultImg}
                    imgPercent={imgPercent}
                    themeBgUser={themeBgUser}
                    resultImgBg={resultImgBg}
                    resultVideo={resultVideo}
                    themeBgUserVideo={themeBgUserVideo}
                 
                />
            ) : (
                <>
                    {pickImgBg && (
                        <>
                            <Dialog.Title className="DialogTitle">Add Image Background</Dialog.Title>
                            <fieldset className="Fieldset-bg">
                                <label className="Label" htmlFor="upload-photo">
                                    {imageUp(50, 50)}
                                    <h6>Upload your image</h6>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="upload-photo"
                                    onChange={(e) => setBgImage(e.target.files[0])}
                                />
                            </fieldset>
                        </>
                    )}

                    {pickImg && (
                        <>
                            <Dialog.Title className="DialogTitle">Add Image</Dialog.Title>
                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="upload-photo">
                                    {imgIcon(30, 30)} File/Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="upload-photo"
                                    onChange={(e) => setAvatar(e.target.files[0])}
                                />
                            </fieldset>
                        </>
                    )}
                    {pickImgVideo && (
                        <>
                            <Dialog.Title className="DialogTitle">Add Video Background</Dialog.Title>
                            <fieldset className="Fieldset-bg">
                                <label className="Label" htmlFor="upload-photo">
                                    {upLoadVideo(50, 50)}
                                    <h6>Upload your video</h6>
                                </label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    id="upload-photo"
                                    onChange={(e) => setBgVideo(e.target.files[0])}
                                />
                            </fieldset>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default memo(Dialog_content);
