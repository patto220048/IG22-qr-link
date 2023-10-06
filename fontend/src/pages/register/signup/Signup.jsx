import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../instance/axiosInstance';

function Signup() {
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState('');
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
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
        const emailValid = validateEmail(values.email);
        const passValid = validatePassword(values.password);
        const usernameValid = validateUsername(values.username);
        const comfirmPassValid = values.password === values.confirmPassword;
        console.log(emailValid, passValid, usernameValid, comfirmPassValid);
        if (emailValid && passValid && usernameValid && comfirmPassValid === true) {
            try {
                const res = await axiosInstance.post(`/auth/signup`, {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });
                // isloading -> false
                setIsLoading(false);
                if (res.data.status === 402) {
                    setErr(res.data.message);
                } else {
                    return navigate('/register/login');
                }
            } catch (error) {
                setErr(error.message);
            }
            if (isLoading) {
                console.log(isLoading);
            }
        } else {
            setErr('Please enter your input');
        }
    };
    // onchange input
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleFocused = (e) => {
        setFocused(true);
    };
    return (
        <div className="signup">
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
                </form>
                <p className="signup-direct">
                    Already have an account? <Link to="/register/login">Log in</Link>
                </p>
                <p className="signup-protected">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
                </p>
            </div>
        </div>
    );
}

export default Signup;
