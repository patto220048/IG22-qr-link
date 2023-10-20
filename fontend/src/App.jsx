import './App.scss';
import Navbar from './layouts/nav/Navbar';
import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/register/login/Login';
import Signup from './pages/register/signup/Signup';
import Footer from './layouts/footer/Footer';
import { lazy, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
// const secure = window.location.protocol === 'https'
// import cookies from "js-cookie";
//lazy loading
const Home = lazy(() => import('./pages/home/Home'));
import Template from './pages/tempate/Template';
import ResetPass from './pages/register/resetPass/ResetPass';
import Newpass from './pages/register/newPass/NewPass';
import axiosInstance from './instance/axiosInstance';
import axios from 'axios';

const Profile = lazy(() => import('./pages/profile/Profile'));

function App() {
 
    const currentUser  = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState()
    console.log(Cookies.get("access_token"))
   // refresh token
   const refreshToken = async () => {
    try {
        const res = await axiosInstance.post(`/auth/refresh-token`, { token: currentUser.refreshToken });
        setUser({
            refreshToken: res.data.refresh_token,
            accsessToken: res.data.access_token,
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};
const onRequestSuccess = (config) => {
    const auth = getCookie();
    config.timeout = 10000;
    if (auth) {
      config.headers = {
        Authorization: "Bearer " + auth,
        "x-api-key": keyHearder
      };
    }
    // Các xử lý khác....
    return config;
  };
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
        let currentDate = new Date();
        console.log(currentDate)
        const decodedToken = jwt_decode(user.refreshToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await refreshToken();
            console.log(data)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

    // protect page
    const ProtectRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/register/login" />;
        }
        return children;
    };
    function Layout() {
        return (
            <div>
                <header>
                    <Navbar />
                </header>
                <Outlet />
                <footer>{/* <Footer/> */}</footer>
            </div>
        );
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: (
                        <Suspense fallback={<div>Loading....</div>}>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: '/template/:username',
                    element: (
                        <ProtectRoute>
                            <Template />
                        </ProtectRoute>
                    ),
                },
            ],
        },
        {
            path: `profile/user/:username`,
            element: (
                <Suspense fallback={<div>Loading....</div>}>
                    <Profile />
                </Suspense>
            ),
        },
        {
            path: 'register/login',
            element: <Login />,
        },
        {
            path: 'register/signup',
            element: <Signup />,
        },
        {
            path: 'register/reset',
            element: <ResetPass />,
        }
        ,
        {
            path: 'register/newpass/:token',
            element: <Newpass/>
        }
    ]);
    return <RouterProvider router={router} />;
}

export default App;
