// lirary import
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// toast lirary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// project import
import jwt_decode from 'jwt-decode';
import bg_login_page from '../../../assets/img/bg/bg_login_page.gif';
import http from '../../../instance/axiosInstance';
import { loginFail, loginStart, loginSuccess, updateData } from '../../../redux-toolkit/userSlice';
import { openEyeIcon, closeEyeIcon, googleIcon } from '../../../svg/icon';
import Loading from '../../../components/dialog/loading/Loading';
//login with google
import { auth, providerGG } from '../../../firebase/config';
import { signInWithPopup } from 'firebase/auth';

function Login() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    // toast message
    const notifyToast = (err) => toast.error(err);

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

    // const onRequestSuccess = (config) => {
    //     const auth = getCookie();
    //     config.timeout = 10000;
    //     if (auth) {
    //         config.headers = {
    //             Authorization: 'Bearer ' + auth,
    //             'x-api-key': keyHearder,
    //         };
    //     }
    //     // Các xử lý khác....
    //     return config;
    // };
    // const axiosJWT = axios.create();
    // axiosInstance.interceptors.request.use(
    //     async (config) => {
    //         config.timeout = 10000;

    //         let currentDate = new Date().getTime();
    //         console.log(currentDate);
    //         const decodedToken = jwt_decode(currentUser.refreshToken);
    //         console.log(decodedToken.exp);
    //         if (decodedToken.exp *1000 > currentDate) {
    //             const data = await refreshToken();
    //             dispatch(updateData(data))
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     },
    // );
    //refresh token
    // const refreshToken = async () => {
    //     try {
    //         const res = await axiosInstance.post(`/auth/refresh-token`, {
    //             token: currentUser.refreshToken,
    //         });
    //         setUser({
    //             refreshToken: res.data.refresh_token,
    //             accsessToken: res.data.access_token,
    //         });
    //         return res.data;
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    //sumbit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.stopPropagation();
        dispatch(loginStart());
        const timeOutId = setTimeout(async () => {
            try {
                //valid email
                const emailValid = validateEmail(values.email);
                if (emailValid === true) {
                    const res = await http.post(`/auth/login`, {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                    });
                    setUser(res.data);
                    console.log(res.data);
                    //dispatch
                    dispatch(loginSuccess(res.data));
                    if (res.data.status === 401) {
                        notifyToast(res.data.message);
                        dispatch(loginFail());
                    } else if (res.data.status === 403) {
                        notifyToast(res.data.message);
                        dispatch(loginFail());
                    } else {
                        navigate(`/template/${res.data.username}`);
                    }
                } else {
                    dispatch(loginFail());
                    notifyToast('Oops! Email is not correct! Please try again.');
                }
            } catch (error) {
                notifyToast(error.message);
                dispatch(loginFail());
            }
        }, 2000);
        return () => {
            clearTimeout(timeOutId);
        };
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleFocused = (e) => {
        setFocused(true);
    };
    //handle login with google
    const handleLoginWithGG = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, providerGG)
            .then((result) => {
                console.log(result);
                http.post('/auth/google', {
                    username: result.user.displayName,
                    email: result.user.email,
                    verifySuccess: result.user.emailVerified,
                    avtImg: result.user.photoURL,
                    fromGoogle: true,

                })
                    .then((res) => {
                        console.log(res.data);
                        dispatch(loginSuccess(res.data));
                        navigate(`/template/${res.data.username}`);
                    })
                    .catch((err) => {
                        setErr('LOGIN FAILED !');
                        dispatch(loginFail());
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return (
        <div className="login">
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
                theme="colored"
            ></ToastContainer>
            {isLoading && <Loading isLoading={isLoading} loginLoading={true}/>}
            <div className="login-left">
                <img className="login-left-img" src={bg_login_page} alt="" />
            </div>

            <div className="login-right">
                <div className="login-title">
                    <h1>Welcome back</h1>
                    <p>Login in your bio !!!</p>
                </div>

                <form method="post" className="form-group">
                    {/* <p className="err_from_sever">{err}</p> */}
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

                    <button className="login-btn" onClick={handleSubmit}>
                        Login
                    </button>
                    <p className="login-direct">
                        Don't have an account? <Link to="/register/signup">Sign up</Link>
                    </p>
                    <p className="login-direct">
                        I don't remember the password? <Link to="/register/reset"> Reset passwrord</Link>
                    </p>
                    <span style={{ opacity: '0.5' }}>OR</span>
                    <span className="login-btn-google" onClick={handleLoginWithGG}>
                        {googleIcon(24, 24)} Login with Google
                    </span>
                </form>
                <p className="login-protected">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
                </p>
            </div>
        </div>
    );
}

export default Login;
