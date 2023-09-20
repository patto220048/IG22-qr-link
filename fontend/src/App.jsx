import { useState } from 'react'
import './App.scss'
import Navbar from './layouts/nav/Navbar'
import { Outlet, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';


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
    }
 
]);
return <RouterProvider router={router} />;
}


export default App
