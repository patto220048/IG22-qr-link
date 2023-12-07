import { useDispatch } from 'react-redux';
import { closeIcon } from '../../svg/icon';
import './Alert.scss';
import http from '../../instance/axiosInstance';
import { useState } from 'react';
import { urlDelete } from '../../redux-toolkit/UrlSlice';

function Alert({ setIsAlert, isAlert, linkId }) {
    const dispatch = useDispatch();
    const handleDeleteUrl = () => {
        const deleteUrl = async () => {
            try {
                const res = await http.delete(`/link/${linkId}`);
                if (res.status === 200) {
                    dispatch(urlDelete(linkId));
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        deleteUrl();
    };
    return (
        <div className={`ALert`}>
            <div className="Alert-head">
                <h6 className="Alert-title">Delete</h6>
                <div className="Alert-close-icon" onClick={() => setIsAlert(false)}>
                    {closeIcon(30, 30)}
                </div>
            </div>
            <p className="Alert-desc">Delete this forever</p>
            <div className="Alert-btn-group">
                <button className="Alert-btn cancel" onClick={()=>setIsAlert(false)}>
                    Cancel
                </button>
                <button className="Alert-btn agree" onClick={handleDeleteUrl}>Delete</button>
            </div>
        </div>
    );
}

export default Alert;
