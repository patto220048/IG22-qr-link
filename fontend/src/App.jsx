import './App.scss';
import Navbar from './layouts/nav/Navbar';
import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/register/login/Login';
import Signup from './pages/register/signup/Signup';
import Cookies from 'js-cookie';

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
import PreView from './components/Preview/PreView';
import Fade from './components/Fade/Fade';
import About from './pages/about/about';
import http from './instance/axiosInstance';
import axios from 'axios';
const Links = lazy(() => import('./pages/links/Links'));
const Profile = lazy(() => import('./pages/profile/Profile'));
function App() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState();
    http.interceptors.request.use(
        (config) => {
            const token = Cookies.get('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    http.interceptors.response.use(
        (response) => response,
        async (error) => {
            console.log(error);
            const originalRequest = error.config;
            // If the error is due to an expired token, attempt to refresh it
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    // Replace the following line with your actual endpoint for refreshing the token
                    const refreshResponse = await http.post('/auth/refresh-token', {
                        // Include any necessary data for refreshing the token
                        token: currentUser.refreshToken,
                    });
                    console.log(refreshResponse);
                    const newToken = refreshResponse.data.accessToken;

                    // Update the cookie with the new token
                    Cookies.set('access_token1', newToken, { expires: 3 }); // Set the expiration as needed

                    // Update the original request headers with the new token
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    // Retry the original request
                    return axios(originalRequest);
                } catch (refreshError) {
                    // Handle token refresh failure, e.g., redirect to login
                    console.error('Token refresh failed:', refreshError);

                    // You might want to redirect to the login page or handle the failure in another way
                }
            }

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
                    path: '/about',
                    element: (
                        <Suspense fallback={<div>Loading....</div>}>
                            <About />
                        </Suspense>
                    ),
                },
                {
                    path: '/template/:username',
                    element: (
                        <ProtectRoute>
                            <Fade onTemplate={true} />
                        </ProtectRoute>
                    ),
                },
                {
                    path: `links`,
                    element: (
                        <Suspense fallback={<div>Loading....</div>}>
                            <ProtectRoute>
                                <Fade onLinks={true} />
                            </ProtectRoute>
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: `profile/:username`,
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
            path: 'register/signup/:username',
            element: <Signup />,
        },
        {
            path: 'register/signup',
            element: <Signup />,
        },
        {
            path: 'register/reset',
            element: <ResetPass />,
        },
        {
            path: 'register/newpass/:token',
            element: <Newpass />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
