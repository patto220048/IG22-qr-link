import { Link, useNavigate } from 'react-router-dom';
import './ResetPass.scss';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginFail, loginStart, loginSuccess } from '../../../redux-toolkit/userSlice';
import Loading from '../../../components/dialog/loading/Loading';

import bg_login from '../../../assets/img/bg_login.jpg';
import http from '../../../instance/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

function ResetPass() {
    const dispatch = useDispatch();
    // notification
    const notifyToast = (message, type, time) => {
        switch (type) {
            case 1:
                toast.success('🦄 ' + message);
                break;
            case 2:
                toast.error('Opps!! ' + message);
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
    // const [isLoading, setIsLoading] = useState(true);

    const [err, setErr] = useState('');
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.user.loading);
    // const isLoading = true;
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(email);
    };
    useEffect(() => {
        const handleClickOutside = () => {
            setErr('');
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [err]);
    // refresh token

    //sumbit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.stopPropagation();
        dispatch(loginStart());
        const timeOutId = setTimeout(async()=>{
            try {
                //valid email
                const emailValid = validateEmail(values.email);
                if (emailValid === true) {
                    const res = await http.post(`/auth/reset-pass`, {
                        email: values.email,
                    });
                    //dispatch
                    if (res.data.status === 200) {
                        dispatch(loginSuccess(res.data.Message));
                        notifyToast(res.data.Message, 1);
                    } else if (res.data.status === 404) {
                        // setErr(res.data.message);
                        notifyToast(res.data.message, 2);
                        dispatch(loginFail());
                    } else if (res.data.status === 403) {
                        notifyToast(res.data.message, 2);
                        dispatch(loginFail());
                    }
                } else {
                    notifyToast('Oops! Email is not correct! Please try again.', 2);
                    // setErr('Oops! Email is not correct! Please try again.');
                    dispatch(loginFail());
                }
            } catch (error) {
                notifyToast(error.message, 2);
                // setErr(error.message);
                dispatch(loginFail());
            }
        },1500)
        return () => {
            clearTimeout(timeOutId);
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleFocused = (e) => {
        setFocused(true);
    };
    return (
        <div className="resetPass" style={{ backgroundImage: `url(${bg_login})` }}>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            ></ToastContainer>
            {isLoading && <Loading isLoading={isLoading} resetPassLoading = {true}/>}
            <div className="resetPass-container">
                <div className="resetPass-title">
                    <h1>Reset password</h1>
                    <p>Enter your mail to reset your password.</p>
                </div>

                <form method="post" className="form-group">
                    <p className="err_from_sever">{err}</p>
                    <div className="resetPass-input">
                        <input
                            className="email-input"
                            type="email"
                            name="email"
                            id="email"
                            onBlur={handleFocused}
                            focused={focused.toString()}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            placeholder="Email"
                            onChange={onChange}
                            // required
                        />
                        <p className="valid-err">Email not valid ( @,"." )</p>
                    </div>
                    <button className="resetPass-btn" type="submit" onClick={handleSubmit}>
                        Send
                    </button>
                </form>
                <p className="resetPass-direct">
                    Don't have an account? <Link to="/register/signup">Sign up</Link>
                </p>
                <p className="resetPass-resetpass">
                    Login your bio? <Link to="/register/login"> Login</Link>
                </p>
                <p className="resetPass-protected">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
                </p>
            </div>
        </div>
    );
}

export default ResetPass;
