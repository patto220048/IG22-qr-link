import './TempProfile.scss';
import { addIcon } from '../../svg/icon';
import Dialog_UI from '../dialog/Dialog_IU';
import { useEffect, useState, memo } from 'react';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../redux-toolkit/userSlice';
import { useParams } from 'react-router-dom';
import http from '../../instance/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function TempProfile() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [maxLenght, setMaxLenght] = useState(80);
    const [openDialog, setOpenDialog] = useState(false);
    const [values, setValues] = useState(null);
    const [onFocus, setOnFocus] = useState(false);
    const notifyToast = (message) =>  toast.success("🦄 "+ message)
    const [pickImg, setPickImg] = useState(false);
    // console.log(values);
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    // };

    useEffect(() => {
        const handleClickOutside = () => {
            setOnFocus(false);
            const updateUser = async () => {
                try {
                    const res = await http.put(`users/${currentUser._id}`, {
                        usernameTitle: values.username,
                        decs: values.decs,
                    });
                    dispatch(updateData(res.data));
                    console.log(res.data);
                } catch (error) {
                    console.log(error.message);
                }
            };
            updateUser();
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [values?.username, values?.decs]);
    const handleOnPickImg = () => {
        setOpenDialog(true)
        setPickImg(true)
    }
    const handleOnPickIcon = () => {
        setOpenDialog(true)
        setPickImg(false)
    }
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
                <img
                    className="tempProfile_img"
                    src={currentUser.avtImg}
                    alt=""
                />
                <div className="tempProfile-btn">
                    <button className="tempProfile-btn_item pickup" onClick={handleOnPickImg}>
                        Pick Image
                    </button>
                    <button className="tempProfile-btn_item remove">Remove</button>
                </div>
                <div>
                    <Dialog_UI openDialog={openDialog} setOpenDialog={setOpenDialog} pickImg={pickImg} notifyToast={notifyToast} />
                </div>
            </div>
            <div className="tempProfile-input">
                <h4 className="tempProfile-input_title">Profile name</h4>
                <input
                    onFocus={() => setOnFocus(true)}
                    name="username"
                    id="username"
                    type="text"
                    placeholder={`@` + (currentUser.usernameTitle ? currentUser.usernameTitle : currentUser.username)}
                    className="tempProfile-input"
                    onChange={onChange}
                    maxLength={16}
                    minLength={1}
                />
                <input />
                <textarea
                    onFocus={() => setOnFocus(true)}
                    name="decs"
                    id="decs"
                    cols="10"
                    rows="10"
                    className="tempProfile-textarea"
                    maxLength={maxLenght}
                    placeholder={currentUser.decs ? currentUser.decs : 'Your description here ...'}
                    onChange={onChange}
                ></textarea>
            </div>
            <div className="tempProfileAddIcon">
                <button className="tempProfileAddIcon-btn"  onClick={handleOnPickIcon} >{addIcon(20, 20)} Add Social icons</button>
            </div>
        </div>
    );
}

export default memo(TempProfile);
