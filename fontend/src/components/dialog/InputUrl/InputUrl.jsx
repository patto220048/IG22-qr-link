import { useEffect, useState, memo } from 'react';
import './InnputUrl.scss';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../../instance/axiosInstance';
import { iconFail, iconStart, iconSuccess, iconUpdate } from '../../../redux-toolkit/iconSlice';
import Loading from '../loading/Loading';

function InputUrl({ socialIconName, setUrlIcon, setClearIcon }) {
    const dispatch = useDispatch();
    const { groupIcon } = useSelector((state) => state.user.currentUser);
    const isLoading = useSelector((state) => state.icon.loading);
    const [iconFecth, setIconFecth] = useState({});
    const toLowerCase = (text) => {
        return text.toLowerCase();
    };
    useEffect(() => {
        groupIcon?.map((icon) => {
            if (icon?.iconName === socialIconName) {
                const fetchIcon = async () => {
                    dispatch(iconStart());
                    //set timeout when fetching icon
                    let timeoutId = setTimeout(async () => {
                        try {
                            const res = await http.get(`/icon/v1/${icon?._id}`);
                            setIconFecth(res.data);
                            setClearIcon(true);
                            dispatch(iconSuccess(res.data));
                        } catch (error) {
                            console.log(error.message);
                            dispatch(iconFail());
                        }
                    }, 1000);
                    return () => {
                        clearTimeout(timeoutId);
                    };
                };
                fetchIcon();
            }
        });
    }, [socialIconName]);
    return (
        <>
            <div className="InputUrl">
                {isLoading ? (
                    <Loading isLoading={isLoading} InputUrlLoading={true}/>
                ) : (
                    <>
                        <h3 className="InputUrl-iconName">Add icon ⭐ {socialIconName} ⭐</h3>
                        <input
                            className="InputUrl-input"
                            type="text"
                            disabled={iconFecth?.iconName === socialIconName ? true : false}
                            placeholder={
                                iconFecth?.iconName === socialIconName ? iconFecth?.iconUrl : 'Enter your URLs here*'
                            }
                            onChange={(e) => {
                                setUrlIcon(e.target.value);
                            }}
                            required = {true}
                            defaultValue={iconFecth?.iconUrl}
                           
                        />
                        <p className="InputUrl-desc">
                            Example : https://www.{toLowerCase(socialIconName)}.com/*usename*
                        </p>
                    </>
                )}
            </div>
        </>
    );
}

export default memo(InputUrl);
