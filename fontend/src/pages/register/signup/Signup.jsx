import { Link, useNavigate } from 'react-router-dom';
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
function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
    const notifyToast = (err) => toast.error(err);
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
        const emailValid = validateEmail(values.email);
        const passValid = validatePassword(values.password);
        const usernameValid = validateUsername(values.username);
        const comfirmPassValid = values.password === values.confirmPassword;
        console.log(emailValid, passValid, usernameValid, comfirmPassValid);
        if (emailValid && passValid && usernameValid && comfirmPassValid === true) {
            try {
                const res = await http.post(`/auth/signup`, {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });
                // isloading -> false
                setIsLoading(true);
                if (res.data.status === 402) {
                    notifyToast(res.data.message);
                    setIsLoading(false);

                } else {
                    setIsLoading(false);
                    return navigate('/register/login');

                }
            } catch (error) {
                notifyToast(error.message);
                setIsLoading(false);

            }
            // if (isLoading) {
            //     console.log(isLoading);
            // }
        } else {
            notifyToast("Something error ! Please try again.");
            setIsLoading(false);
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
            {isLoading && <Loading isLoading={isLoading} />}
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
                                super-card/
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
                            />
                            <p className="valid-err">Username not valid ( min "3" characters)</p>
                        </div>
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
                        <p className="valid-err">Password not valid (min "8" character ) </p>
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
                    <span style={{ opacity: '0.5' }}>OR</span>
                    <span className="login-btn-google" onClick={handleSignupWithGG}>
                        {googleIcon(24, 24)} Sign up with Google
                    </span>
                </form>
                <p className="signup-protected">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
                </p>
            </div>
        </div>
    );
}

export default Signup;
