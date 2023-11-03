import { Link, useNavigate } from 'react-router-dom';
import './ResetPass.scss';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginFail, loginStart, loginSuccess } from '../../../redux-toolkit/userSlice';
import Loading from '../../../components/dialog/loading/Loading';

import bg_login from '../../../assets/img/bg_login.jpg';
import http from '../../../instance/axiosInstance';

function ResetPass() {
    const dispatch = useDispatch();
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
    }, []);
    // refresh token

    //sumbit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.stopPropagation();
        dispatch(loginStart());
        try {
            //valid email
            const emailValid = validateEmail(values.email);
            if (emailValid === true) {
                const res = await http.post(`/auth/reset-pass`, {
                    email: values.email,
                });
                console.log(res.data);
                //dispatch
                dispatch(loginSuccess(res.data.Message));
                if (res.data.status === 404) {
                    setErr(res.data.message);
                    dispatch(loginFail());
                } else if (res.data.status === 403) {
                    setErr(res.data.message);
                    dispatch(loginFail());
                } else {
                    console.log('Check your email ');
                }
            } else {
                setErr('Oops! Email is not correct! Please try again.');
                dispatch(loginFail());
            }
        } catch (error) {
            setErr(error.message);
            dispatch(loginFail());
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
            {isLoading && <Loading isLoading={isLoading} />}
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
