import { Link } from 'react-router-dom';
import './Signup.scss';

function Signup() {
    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-title">
                    <h1>Join with us</h1>
                    <p>Sign up for free !!!</p>
                </div>

                <form  method="post" className="form-group">
                    <input className="signup-input" type="email" name="email" id="email" placeholder='Email' />
                    {/* <p className="input-err">12</p> */}
                    <input className="signup-input" type="text" name="username" id="username" placeholder='Username'/>
                    {/* <p className="input-err">12</p> */}

                    <input className="signup-input" type="password" name="password" id="password" placeholder='Password'/>
                    {/* <p className="input-err">12</p> */}

                    <button className="signup-btn" type="sumit">
                        Create account
                    </button>
                </form>
                <p className='signup-direct'>Already have an account? <Link to="/register/login">Log in</Link></p>
                <p className='signup-protected'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</p>
            </div>
        </div>
    );
}

export default Signup;
