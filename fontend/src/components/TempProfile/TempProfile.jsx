import './TempProfile.scss';
import { addIcon } from '../../svg/icon';
import Dialog_UI from '../dialog/Dialog_IU';
import { useEffect, useState, memo } from 'react';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loadingEnd, loadingStart, updateData } from '../../redux-toolkit/userSlice';
import { useParams } from 'react-router-dom';
import http from '../../instance/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import avatarDefault from '../../untils/AvatarLink';
function TempProfile({ setIcon, setIsLoading, isLoading, theme, user, icons ,setPickImg,pickImg}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [maxLenght, setMaxLenght] = useState(80);
    const [openDialog, setOpenDialog] = useState(false);
    const [values, setValues] = useState(null);
    const [onFocus, setOnFocus] = useState(false);
    const notifyToast = (message, type, time) => {
        switch (type) {
            case 1:
                toast.success('🦄 ' + message);
                break;
            case 2:
                toast.error('Opps !!' + message);
                break;
            case 3:
                toast.promise(time, {
                    pending: `${message} pending`,
                    success: `${message} resolved 👌`,
                    error: `${message}  rejected 🤯`,
                });
                break;
            default:
                break;
        }
    };
    const inputRefUsername = useRef();
    const inputRefDesc = useRef();

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            dispatch(loadingStart());
            const updateUser = async () => {
                try {
                    const res = await http.put(`users/${currentUser._id}`, {
                        usernameTitle: values.username, 
                    });
                    setIsLoading(false);
                    const timeOutId = setTimeout(async () => {
                        dispatch(updateData(res.data));
                    }, 1000);
                    // notifyToast('Update',3,timeOutId)
                    return () => {
                        clearTimeout(timeOutId);
                    };
                } catch (error) {
                    dispatch(loadingEnd());
                    console.log(error.message);
                }
            };
            updateUser();
        };
        inputRefUsername.current?.addEventListener('focusout', handleClickOutside);
        return () => {
            inputRefUsername.current?.removeEventListener('focusout', handleClickOutside);
        };
    }, [values?.username]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            dispatch(loadingStart());
            const updateUser = async () => {
                try {
                    const res = await http.put(`users/${currentUser._id}`, {
                        decs: values.decs,
                    });
                    const timeOutId = setTimeout(async () => {
                        dispatch(updateData(res.data));
                    }, 2000);
                    notifyToast('Update',3,timeOutId)

                    return () => {
                        clearTimeout(timeOutId);
                    };
                } catch (error) {
                    console.log(error.message);
                    dispatch(loadingEnd());
                }
            };
            updateUser();
        };

        inputRefDesc.current?.addEventListener('focusout', handleClickOutside);
        return () => {
            inputRefDesc.current?.removeEventListener('focusout', handleClickOutside);
        };
    }, [values?.decs]);

    // const onKeyDown = (key) => {
    //     if (key === 'Enter') {
    //         const updateUser = async () => {
    //             dispatch(loadingStart());
    //             try {
    //                 const res = await http.put(`users/${currentUser._id}`, {
    //                     usernameTitle: values?.username,
    //                     decs: values?.decs,
    //                 });
    //                 const timeOutId = setTimeout(async () => {
    //                     dispatch(updateData(res.data));
    //                 }, 1000);
    //                 return () => {
    //                     clearTimeout(timeOutId);
    //                 };
    //             } catch (error) {
    //                 console.log(error.message);
    //                 dispatch(loadingEnd());
    //             }
    //         };

    //         updateUser();
    //     }
    // };
    // onKeyDown();

    const handleOnPickImg = () => {
        setOpenDialog(true);
        setPickImg(true);
    };
    const handleOnPickIcon = () => {
        setOpenDialog(true);
        setPickImg(false);
    };
    return (
        <div className="tempProfile">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            ></ToastContainer>
            <div className="tempProfile-item">
                <img className="tempProfile_img" src={user?.avtImg || avatarDefault} alt=""  loading='lazy' />
                <div className="tempProfile-btn">
                    <button className="tempProfile-btn_item pickup" onClick={handleOnPickImg}>
                        Pick Image
                    </button>
                    <button className="tempProfile-btn_item remove" onClick={handleOnPickImg}>
                        Remove
                    </button>
                </div>
                <div>
                    <Dialog_UI
                        theme ={theme}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        pickImg={pickImg}
                        setPickImg={setPickImg}
                        notifyToast={notifyToast}
                        setIcon={setIcon}
                        user={user}
                    />
                </div>
            </div>
            <div className="tempProfile-input">
                <h4 className="tempProfile-input_title">Profile name</h4>
                <input
                    ref={inputRefUsername}
                    onFocus={() => setOnFocus(true)}
                    name="username"
                    id="username"
                    type="text"
                    placeholder={`@` + (user?.usernameTitle ? user?.usernameTitle : user?.username)}
                    className="tempProfile-input"
                    defaultValue={user?.usernameTitle ? user?.usernameTitle : user?.username}
                    onChange={onChange}
                    maxLength={16}  
                    minLength={1}
                    // onKeyDown={(e) => onKeyDown(e.key)}
                />
                <input />
                <textarea
                    ref={inputRefDesc}
                    onFocus={() => setOnFocus(true)}
                    name="decs"
                    id="decs"
                    cols="10"
                    rows="10"
                    className="tempProfile-textarea"
                    maxLength={maxLenght}
                    placeholder={user?.decs ? user?.decs : 'Your description here ...'}
                    onChange={onChange}
                    onKeyDown={(e) => onKeyDown(e.key)}
                ></textarea>
            </div>
            <div className="tempProfileAddIcon">
                <button className="tempProfileAddIcon-btn" onClick={handleOnPickIcon}>
                    {addIcon(20, 20)} Add Social icons
                </button>
            </div>
        </div>
    );
}

export default memo(TempProfile);
