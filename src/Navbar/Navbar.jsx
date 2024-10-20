import { Link, NavLink, useNavigate } from "react-router-dom";
import auth from "../Firebase/firebase.config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../useAdmin";


const Navbar = () => {
    const { user, logOut} = useContext(AuthContext);
    const [isAdmin,setIsAdmin] =useState(useAdmin());
    const nav = useNavigate();
    console.log(isAdmin);
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
        nav("/login");
        setIsAdmin(false);

    }


    // naeemislam11155@gmail.com
    // 7842342
    const navlinkStyles = ({ isActive }) => {
        return {
            borderBottom: isActive ? "2px solid #8f602a" : "",
            borderTop: isActive ? "2px solid #ad8659" : "2px solid #ad8659",
            backgroundColor: isActive ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.1)",
            color: isActive ? "#8f602a" : "#8f540f",
            fontWeight: isActive ? "bold" : "normal",
            borderRadius: isActive ? 0 : 0,
        };
    };
    let [links,setLinks]=useState(
        <>
            <li><NavLink to="/" style={navlinkStyles}>Home</NavLink></li>
            <li><NavLink to="/rooms" style={navlinkStyles}>Rooms</NavLink></li>
            <li><NavLink to="/bookings" style={navlinkStyles}>My Bookings</NavLink></li>
            <li><NavLink to="/contacts" style={navlinkStyles}>Contacts</NavLink></li>
            <li><NavLink to="/about" style={navlinkStyles}>About</NavLink></li>
    
        </>
    )
    useEffect(()=>{
        if(isAdmin){
            setLinks(<>
            <li><NavLink to="/" style={navlinkStyles}>Home</NavLink></li></>)

        }
        else{
            setLinks(<>
            <li><NavLink to="/" style={navlinkStyles}>Home</NavLink></li>
            <li><NavLink to="/rooms" style={navlinkStyles}>Rooms</NavLink></li>
            <li><NavLink to="/bookings" style={navlinkStyles}>My Bookings</NavLink></li>
            <li><NavLink to="/contacts" style={navlinkStyles}>Contacts</NavLink></li>
            <li><NavLink to="/about" style={navlinkStyles}>About</NavLink></li>
    
        </>)
        }

    },[user,isAdmin])

    
    return (
        <div>
            <div className="navbar bg-[#ffe3c2] pon font-medium text-[#8f540f]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost text-4xl font-semibold flex items-center"><span className="bhand"><span className="text-5xl">T</span>ravellers</span> <span className="text-[#ff8800] bhand text-5xl">Valley</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-2xl flex items-start">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end space-x-6">
                    {
                        user ?
                            <>
                            <p>{user.displayName}</p>
                            <button onClick={handleLogOut}>Log Out</button>
                            </>
                            :
                            <Link to="/login">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;