import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useEffect, useState } from 'react';
import { openEyeIcon, closeEyeIcon } from '../../../svg/icon';
import axiosInstance from '../../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginFail, loginStart, loginSuccess } from '../../../redux-toolkit/userSlice';
import Loading from '../../../components/dialog/loading/Loading';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import bg_login from "../../../assets/img/bg_login.jpg";
function Login() {
    const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [user, setUser] = useState(null);
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
    const refreshToken = async () => {
        try {
            const res = await axiosInstance.post(`/auth/refresh-token`, { token: user.refreshToken });
            setUser({
                ...user,
                refreshToken: res.data.refresh_token,
                accsessToken: res.data.access_token,
            });
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    };
    axios.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.refreshToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers['authorization'] = 'Bearer ' + data.access_token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    //sumbit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.stopPropagation();
        dispatch(loginStart());
        try {
            //valid email
            const emailValid = validateEmail(values.email);
            if (emailValid === true) {
                const res = await axiosInstance.post(`/auth/login`, {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });
                console.log(res.data);
                setUser(res.data);
                //dispatch
                dispatch(loginSuccess(res.data));

                if(res.data){
                    navigate(`/template/${res.data.username}`);
                }
                else if (res.data.status === 401) {
                    setErr(res.data.message);
                    dispatch(loginFail());
                } else if (res.data.status === 403) {
                    setErr(res.data.message);
                    dispatch(loginFail());
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
        <div className="login" style={{backgroundImage:`url(${bg_login})`}}>
            {isLoading && <Loading isLoading={isLoading} />}
            <div className="login-container">
                <div className="login-title">
                    <h1>Welcome back</h1>
                    <p>Login in your bio !!!</p>
                </div>

                <form  method='post' className="form-group">
                    <p className="err_from_sever">{err}</p>
                    <div className="login-input">
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
                    <div className="login-input">
                        <input
                            className="password-input"
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <p className="valid-err">Password not valid (min "8" character ) </p>
                        <span className="showPass" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <> {openEyeIcon(24, 24)}</> : <>{closeEyeIcon(26, 26)}</>}
                        </span>
                    </div>

                    <button className="login-btn" type="sumit" onClick={handleSubmit}>
                        Login
                    </button>
                </form>
                <p className="login-direct">
                    Don't have an account? <Link to="/register/signup">Sign up</Link>
                </p>
                <p className="login-protected">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
                </p>
            </div>
        </div>
    );
}

export default Login;
