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
import PreView from './components/Preview/PreView';
const Links = lazy(() => import('./pages/links/Links'));
const Profile = lazy(() => import('./pages/profile/Profile'));

function App() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState();

    //
    // protect page
    const ProtectRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/register/login" />;
        }
        return children;
    };
    function Layout() {
        return (
            <div className="app-wapper">
                <header>
                    <Navbar />
                </header>
                <body className="body-main">
                    <div className="body-main-item">
                        <Outlet />
                    </div>
                    {/* <div className="preview">
                        <PreView />
                    </div> */}
                </body>
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
                {
                    path: `links`,
                    element: (
                        <Suspense fallback={<div>Loading....</div>}>
                            <ProtectRoute>
                                <Links />
                            </ProtectRoute>
                        </Suspense>
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
        },
        {
            path: 'register/newpass/:token',
            element: <Newpass />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
