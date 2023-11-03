import { Link, useNavigate, useParams } from 'react-router-dom';
import './NewPass.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../instance/axiosInstance';
import http from '../../../instance/axiosInstance';

function Signup() {
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState('');
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
    const token = useParams().token
    console.log(token)
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
    });
    const validatePassword = (password) => {
        // Define validation rules for password
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
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
        const passValid = validatePassword(values.password);
        const comfirmPassValid = values.password === values.confirmPassword;
        console.log( passValid, comfirmPassValid);
        if (passValid && comfirmPassValid === true) {
            try {
                const res = await http.post(`/auth/reset-pass/${token}`, {
                    password: values.password,
                });
                // isloading -> false
                setIsLoading(false);
                console.log(res.data)
                if (res.data.status === 500) {
                    setErr('Reset password unsuccessful. Please try again !');
                } else {
                    alert("Reset password successful!")
                    return navigate('/register/login');
                }
            } catch (error) {
                setErr(error.message);
            }
            // if (isLoading) {
            //     console.log(isLoading);
            // }
        } else {
            setErr('Something error ! Please try again !');
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
        <div className="newpass">
            <div className="newpass-container">
                <div className="newpass-title">
                    <h1>New password</h1>
                    <p>Enter your new password !!!</p>
                </div>
                <form className="form-group">
                    <p className="err_from_sever">{err}</p>
                    <div className="newpass-input">
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
                    <div className="newpass-input">
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

                    <button className="newpass-btn" type="submit" onClick={handleSubmit}>
                       Submit
                    </button>
                </form>
                <p className="newpass-direct">
       
                </p>
                <p className="newpass-protected">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
                </p>
            </div>
        </div>
    );
}

export default Signup;
