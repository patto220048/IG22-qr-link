import { useState } from 'react'
import './App.scss'
import Navbar from './layouts/nav/Navbar'
import { Outlet, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/register/login/Login';
import Signup from './pages/register/signup/Signup';
import Footer from './layouts/footer/Footer';
import Profile from './pages/profile/Profile';


function App() {
  function Layout (){
    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <Outlet/>
            <footer>
                {/* <Footer/> */}
            </footer>
        </div>
    );
  };
  

  const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
           
        ],
       
    },
    {
        path: 'profile/user/:id',
        element: <Profile />,
    },
    {
        path: 'register/login',
        element: <Login />,
    },
    {
        path: 'register/signup',
        element: <Signup />,
    }
 
]);
return <RouterProvider router={router} />;
}


export default App
