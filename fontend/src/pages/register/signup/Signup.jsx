import { Link } from 'react-router-dom';
import './Signup.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../instance/axiosInstance';

function Signup() {
    const [isLoading, setIsLoading] = useState(true);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    console.log(axiosInstance)
    console.log(values);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = axiosInstance.post(`/auth/signup`, {
            username: values.username,
            email: values.email,
            password: values.password,
        })
        console.log(data);
    };
    // onchange input
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-title">
                    <h1>Join with us</h1>
                    <p>Sign up for free !!!</p>
                </div>

                <form className="form-group">
                    <input
                        className="signup-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={onChange}
                    />

                    {/* <p className="input-err">12</p> */}
                    <input
                        className="signup-input"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={onChange}
                    />
                    {/* <p className="input-err">12</p> */}
                    <input
                        className="signup-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={onChange}
                    />
                    {/* <p className="input-err">12</p> */}

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
