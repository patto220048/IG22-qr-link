import { useState } from 'react';
import './App.scss';
import Navbar from './layouts/nav/Navbar';
import { Outlet, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Home from './pages/home/Home';
import Login from './pages/register/login/Login';
import Signup from './pages/register/signup/Signup';
import Footer from './layouts/footer/Footer';
<<<<<<< HEAD
// import Profile from './pages/profile/Profile';
// import Template from './pages/tempate/Template';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/home/Home'));
const Template = lazy(() => import('./pages/tempate/Template'));
const Profile = lazy(() => import('./pages/profile/Profile'));

=======
import Profile from './pages/profile/Profile';
import Template from './pages/tempate/Template';
>>>>>>> 3ca968a277c926518bbb7744b570bd4cfdfbc82f
function App() {
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
<<<<<<< HEAD

=======
>>>>>>> 3ca968a277c926518bbb7744b570bd4cfdfbc82f
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
<<<<<<< HEAD
                    element: (
                        <Suspense fallback={<div>Loading....</div>}>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: '/template',
                    element: (
                        <Suspense fallback={<div>Loading....</div>}>
                            <Template />
                        </Suspense>
                    ),
=======
                    element: <Home />,
                },
                {
                    path: '/template',
                    element: <Template />,
>>>>>>> 3ca968a277c926518bbb7744b570bd4cfdfbc82f
                },
            ],
        },
        {
            path: 'profile/user/:id',
<<<<<<< HEAD
            element: (
                <Suspense fallback={<div>Loading....</div>}>
                    <Profile />
                </Suspense>
            ),
=======
            element: <Profile />,
>>>>>>> 3ca968a277c926518bbb7744b570bd4cfdfbc82f
        },
        {
            path: 'register/login',
            element: <Login />,
        },
        {
            path: 'register/signup',
            element: <Signup />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
