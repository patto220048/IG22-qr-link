import { Link } from 'react-router-dom';
import './Login.scss';

function Login() {
    return (
        <div className="login">
            <div className="login-container">
                <div className="login-title">
                    <h1>Welcome back</h1>
                    <p>Login in your bio !!!</p>
                </div>

                <form  method="post" className="form-group">
                    <input className="login-input" type="text" name="email" id="email" placeholder='Email' />
                    {/* <p className="input-err">12</p> */}

                    <input className="login-input" type="password" name="password" id="password" placeholder='Password'/>
                    {/* <p className="input-err">12</p> */}

                    <button className="login-btn" type="sumit">
                        Login 
                    </button>
                </form>
                <p className='login-direct'>Don't have an account? <Link to="/register/signup" >Sign up</Link></p>
                <p className='login-protected'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</p>
            </div>
        </div>
    );
}

export default Login;
