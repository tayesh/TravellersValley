import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;