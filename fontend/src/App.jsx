import './App.scss';
import Navbar from './layouts/nav/Navbar';
import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/register/login/Login';
import Signup from './pages/register/signup/Signup';
import Footer from './layouts/footer/Footer';
import { lazy, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
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
    // refresh token
    const refreshToken = async () => {
        try {
            const res = await axiosInstance.post(`/auth/refresh-token`, { token: currentUser.refreshToken});
            setUser({
                ...user,
                refreshToken: res.data.refresh_token,
                accsessToken: res.data.access_token,
            });
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    };
    axios.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.refreshToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers['authorization'] = 'Bearer ' + data.access_token;
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
