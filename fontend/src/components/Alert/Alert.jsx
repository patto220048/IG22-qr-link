import { useDispatch } from 'react-redux';
import { closeIcon } from '../../svg/icon';
import './Alert.scss';
import http from '../../instance/axiosInstance';
import { useState } from 'react';
import { urlDelete } from '../../redux-toolkit/UrlSlice';
import DetailContact from '../DetailContact/DetailConTact';
import Dialog_IU from '../dialog/Dialog_IU';

function Alert({ setIsAlert, isAlert, linkId, isDetail, setIsDetail, isThumbnail, setIsThumbnail }) {
    const dispatch = useDispatch();
    const [thumbail, setThumbnail] = useState(false);
    const handleDeleteUrl = () => {
        const deleteUrl = async () => {
            try {
                const res = await http.delete(`/link/${linkId}`);
                if (res.status === 200) {
                    dispatch(urlDelete(linkId));
                    setIsAlert(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        deleteUrl();
    };

    const handleCloseDelete = () => {
        setIsAlert(false);
        isDetail && setIsDetail(false);
        isThumbnail && setIsThumbnail(false);
    };
    const handleCloseDetail = () => {
        setIsDetail(false);
        isAlert && setIsAlert(false);
        isThumbnail && setIsThumbnail(false);
    };
    const handleCloseThumbnail = () => {
        setIsThumbnail(false);
        isDetail && setIsDetail(false);
        isAlert && setIsAlert(false);
    };
    return (
        <div className={`ALert`}>
            {isAlert || isDetail || isThumbnail ? (
                <>
                    {isAlert && (
                        <>
                            <div className="Alert-head">
                                <h6 className="Alert-title">Delete</h6>
                                <div className="Alert-close-icon" onClick={handleCloseDelete}>
                                    {closeIcon(30, 30)}
                                </div>
                            </div>
                            <p className="Alert-desc">Delete this forever</p>
                            <div className="Alert-btn-group">
                                <button className="Alert-btn cancel" onClick={handleCloseDelete}>
                                    Cancel
                                </button>
                                <button className="Alert-btn agree" onClick={handleDeleteUrl}>
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                    {isDetail && (
                        <>
                            <div className="Alert-head">
                                <h6 className="Alert-title">Contact Detail</h6>
                                <div className="Alert-close-icon" onClick={handleCloseDetail}>
                                    {closeIcon(30, 30)}
                                </div>
                            </div>
                            <DetailContact setIsDetail={setIsDetail} isDetail={isDetail} />
                            <button onClick={handleCloseDetail}>close</button>
                        </>
                    )}
                    {isThumbnail && (
                        <>
                            <div className="Alert-head">
                                <h6 className="Alert-title">Contact Detail</h6>
                                <div className="Alert-close-icon" onClick={handleCloseThumbnail}>
                                    {closeIcon(30, 30)}
                                </div>
                            </div>
                            <span className="thumbnail-desc">Add your thumbail this link.</span>
                            <button className="btn-thumbail" onClick={() => setThumbnail(true)}>
                                {' '}
                                Set Thumbnail
                            </button>
                            {thumbail && <Dialog_IU openDialog={thumbail} setOpenDialog={setThumbnail} thumbnail={thumbail}/>}
                        </>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Alert;
