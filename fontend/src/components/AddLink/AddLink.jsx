import { useState } from 'react';
import { closeIcon } from '../../svg/icon';
import './AddLink.scss';
import http from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { urlAdd, urlFail, urlStart, urlSuccess } from '../../redux-toolkit/UrlSlice';
import { sortUrl } from '../../untils/sortUrl';
function AddLink({ setIsAddLink, isAddLink , onChange, values}) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    const dispatch = useDispatch();
    const handleAddLink = () => {
        dispatch(urlStart());
        const addLink = async () => {
            try {
                const res = await http.post(`/link/${currentTheme?._id}`, {
                    urlTitle: sortUrl(values.url)?.host,
                    url: values.url,
                    urlThumbnail: sortUrl(values.url)?.host + '/' + "favicon.ico",
                    urlStyle : true
                });
                setIsAddLink(false);
                const timeOutId = setTimeout(() => dispatch(urlAdd(res.data)), 1000);
                return () => {
                    clearTimeout(timeOutId);
                };
            } catch (error) {
                console.log(error.message);
                dispatch(urlFail());
            }
        };
        addLink();
    };
   
    return (
        <div className={'AddLink '}>
            <div className="AddLink-wapper">
                <div className="AddLink-content">
                    <h2 className="AddLink-content_title">Enter your URL</h2>
                    <div className="AddLink-content_group">
                        <input
                            id="url"
                            name="url"
                            type="text"
                            className="AddLink-content_input"
                            placeholder="Your URL"
                            onChange={onChange}
                            required
                            minLength={5}
                        />
                        <button
                            className="AddLink-content-btn"
                            disabled={values ? false : true}
                            onClick={handleAddLink}
                        >
                            ADD
                        </button>
                    </div>

                    <section className="AddLink-content_option"></section>
                </div>

                <div className="AddLink-off" onClick={() => setIsAddLink(false)}>
                    {closeIcon(25, 25)}
                </div>
            </div>
        </div>
    );
}

export default AddLink;
