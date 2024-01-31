import { Link, useNavigate, useParams } from 'react-router-dom';
import './Signup.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../instance/axiosInstance';
import { googleIcon } from '../../../svg/icon';
import http from '../../../instance/axiosInstance';
// toast lirary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/dialog/loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loadingStart, loginFail, loginSuccess } from '../../../redux-toolkit/userSlice';
function Signup() {
    const isLoading = useSelector((state) => state.user.loading);
    const [err, setErr] = useState('');
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
    const username = useParams().username
    console.log(username);
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
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const validatePassword = (password) => {
        // Define validation rules for password
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };
    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(email);
    };
    const validateUsername = (username) => {
        const usernameRegex = /[A-Za-z0-9]{3,}/;
        return usernameRegex.test(username);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(loadingStart())
        const emailValid = validateEmail(values.email);
        const passValid = validatePassword(values.password);
        const usernameValid = validateUsername(values.username);
        const comfirmPassValid = values.password === values.confirmPassword;
        console.log(emailValid, passValid, usernameValid, comfirmPassValid);
        const timeOutId = setTimeout(async() => {
            if (emailValid && passValid && usernameValid && comfirmPassValid === true) {
                try {
                    const res = await http.post(`/auth/signup`, {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                    });
                    // isloading -> false
                    // setIsLoading(true);
                    console.log(res.data)
                    if (res.data.status === 402) {
                        notifyToast(res.data.message,2);
                        dispatch(loginFail())
                    } else {
                        notifyToast(res.data.message,1);
                        dispatch(loginSuccess())
                        return navigate('/register/login');
                    }
                } catch (error) {
                    notifyToast(error.message,2);
                }
            } else {
                dispatch(loginFail())
                notifyToast("Something error ! Please try again.",2);
             
            }
        },1500)
       return () => {
        clearTimeout(timeOutId)
       }

    };
    // onchange input
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleFocused = (e) => {
        setFocused(true);
    };
    // handle sign up with google
    const handleSignupWithGG = () => {};
    return (
        <div className="signup">
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
            {isLoading && <Loading isLoading={isLoading} signupLoading={true}/>}
            <div className="signup-container">
                <div className="signup-title">
                    <h1>Join with us</h1>
                    <p>Sign up for free !!!</p>
                </div>
                <form className="form-group">
                    <p className="err_from_sever">{err}</p>
                    <div className="signup-input">
                        <input
                            className="email-input"
                            type="email"
                            name="email"
                            id="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onBlur={handleFocused}
                            focused={focused.toString()}
                            placeholder="Email"
                            onChange={onChange}
                            required
                        />
                        <p className="valid-err">Email not valid ( @,"." )</p>
                    </div>
                    <div className="signup-input">
                        <div className="username">
                            <label htmlFor="username" aria-disabled>
                                super-card.online/
                            </label>
                            <input
                                className="username-input"
                                type="text"
                                pattern="[A-Za-z0-9]{3,}"
                                name="username"
                                id="username"
                                minLength={3}
                                maxLength={16}
                                onBlur={handleFocused}
                                focused={focused.toString()}
                                placeholder="Username"
                                onChange={onChange}
                                defaultValue={username ? username : ""}
                                
                            />
                        </div>
                        <p className="valid-err">Username not valid ( min "3" characters)</p>
                    </div>
                    <div className="signup-input">
                        <input
                            className="password-input"
                            type="password"
                            name="password"
                            id="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            onBlur={handleFocused}
                            focused={focused.toString()}
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <p className="valid-err">Password not valid (min "8" character and one big character)</p>
                    </div>
                    <div className="signup-input">
                        <input
                            className="confirmPassword-input"
                            type="password"
                            pattern={values.password}
                            name="confirmPassword"
                            id="confirmPassword"
                            onBlur={handleFocused}
                            focused={focused.toString()}
                            placeholder="Comfirm Password"
                            onChange={onChange}
                        />
                        <p className="valid-err">Password incorrect !</p>
                    </div>
                    <button className="signup-btn" type="submit" onClick={handleSubmit}>
                        Create account
                    </button>
                    <p className="signup-direct">
                        Already have an account? <Link to="/register/login">Log in</Link>
                    </p>
                    {/* <span style={{ opacity: '0.5' }}>OR</span>
                    <span className="login-btn-google" onClick={handleSignupWithGG}>
                        {googleIcon(24, 24)} Sign up with Google
                    </span> */}
                </form>
                <p className="signup-protected">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
                </p>
            </div>
        </div>
    );
}

export default Signup;
