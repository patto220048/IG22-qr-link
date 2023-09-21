import { useState } from 'react'
import './App.scss'
import Navbar from './layouts/nav/Navbar'
import { Outlet, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/register/login/Login';
import Signup from './pages/register/signup/Signup';


function App() {
  function Layout (){
    return (
        <div>
            <nav>
                <Navbar/>
            </nav>
            <Outlet/>
            <footer>

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
