import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../instance/axiosInstance';

function Signup() {
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState('');
    console.log(err);
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const signup = async () => {
            // valid email and password
            const validPassword = validatePassword(password);
            const validEmail = validateEmail(email);
            try {
                if (validPassword && validEmail === true) {
                    const res = await axiosInstance.post(`/auth/signup`, {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                    });
                    // isloading -> false
                    setIsLoading(false);
                    console.log(res.data);
                    navigate('/register/login')
                  
                }
                else if(validEmail===false){
                    setErr("Email incorrect!")
                }
                else if(validPassword===false){
                    setErr("Password min 8 chars!")
                }
               
                
            } catch (error) 
            {
                console.log(error.message)
            }
            if(isLoading){
                return <>Loading....</>
            }
        };
        signup();
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

                   {err ? <p className="input-err">{err}</p>: <></>}
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
