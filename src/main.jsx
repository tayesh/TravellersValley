import React from 'react'
import ReactDOM from 'react-dom/client'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Root from './Root/Root';
import Home from './layouts/Home';
import Login from './layouts/Login';
import Register from './layouts/Register';
import AuthProvider from './AuthProvider/AuthProvider';
import Rooms from './layouts/Rooms';
import ErrorPage from './layouts/ErrorPage';
import RoomDetails from './layouts/RoomDetails';
import PrivateRoute from './PribvateRoute/PrivateRoute';
import MyBookings from './layouts/MyBookings';
import About from './layouts/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader:()=>fetch("http://localhost:5002/rooms")
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
      },
      {
        path: "/bookings",
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
      },
      {
        path: "/contacts",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>

      }

      ,{
        path:"/rooms/:id",
        element:<PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5002/rooms/${params.id}`)
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
