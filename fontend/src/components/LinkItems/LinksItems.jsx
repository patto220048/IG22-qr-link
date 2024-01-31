import { useEffect, useState } from 'react';
import LinksItem from '../LinksItem/LinksItem';
import './LinksItems.scss';
import { useDispatch, useSelector } from 'react-redux';
import { urlAdd, urlFail, urlStart } from '../../redux-toolkit/UrlSlice';
import http from '../../instance/axiosInstance';

function LinksItems({ onChange, user }) {
    // const currentTheme = useSelector((state)=> state.theme.currentTheme)
    const currentLink = useSelector((state) => state.url.currentUrl);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const dispatch = useDispatch();
    // const handleAddLink = () => {
    //     dispatch(urlStart());
    //     const addLink = async () => {
    //         try {
    //             const res = await http.post(`/link/${currentTheme?._id}`, {
    //                 headerStyle: true,
    //             });
    //             const timeOutId = setTimeout(() => dispatch(urlAdd(res.data)), 1000);
    //             return () => {
    //                 clearTimeout(timeOutId);
    //             };
    //         } catch (error) {
    //             console.log(error.message);
    //             dispatch(urlFail());
    //         }
    //     };
    //     addLink();
    // };
    return (
        <div className="LinksItems">
            {currentLink?.map((link, index) => (
                <LinksItem
                    user={user}
                    onChange={onChange}
                    link={link}
                    linkIndex={index}
                    linkId={link?._id}
                    linkUrl={link.url}
                    linkTitle={link.urlTitle}
                    linkThumbnail={link.thumbnailImage}
                    acticve={link.acticve}
                    key={index}
                    headerStyle={link.headerStyle}
                    urlStyle={link.urlStyle}
                    linkDesc={link.decs}
                    contactStyle={link.contactStyle}
                />
            ))}
        </div>
    );
}

export default LinksItems;
