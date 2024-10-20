import { getAuth, signInWithPopup } from "firebase/auth";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import app from "../Firebase/firebase.config";
import axios from "axios";


const Login = () => {
    const nav = useNavigate();
    const { login } = useContext(AuthContext);
    const location =useLocation();





    const handleGoogleLogin = () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider(); 

        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                
                

                nav(location?.state? location.state : "/")
                console.log(loggedInUser);
            })
            .catch(error => {
                console.error(error.message);
                toast.error(error.message);
            })
    }


    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then(result=>{
                
                nav(location.state?location.state:"/")
            })
            .catch()


    }


    return (
        <div>
            <h2 className="text-4xl pon text-center my-10">Login</h2>
            <form onSubmit={handleLogin} className="" >

                <label className="form-control w-full max-w-xs mx-auto mb-3">
                    <div className="label">
                        <span className="label-text text-xl pon text">Enter your Email</span>

                    </div>
                    <input type="text" placeholder="Type here" name="email" className="input input-bordered w-full max-w-xs" />

                </label>
                {/* <label className="input input-bordered flex items-center max-w-xs gap-2 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="text" className="grow" placeholder="Username" />
            </label> */}
                <label className="form-control w-full max-w-xs mx-auto mb-6 ">
                    <div className="label">
                        <span className="label-text text-xl pon text">Enter password</span>
                    </div>
                    <input type="text" placeholder="Type here" name="password" className="input input-bordered w-full max-w-xs" />

                </label>
                <hr className="bg-[#8f540f] h-[2px] w-[330px] border-none mx-auto mb-6" />
                <div className="flex justify-center gap-20 items-center mb-4">
                    <img onClick={handleGoogleLogin} className="w-[50px] hover:cursor-pointer" src="https://i.ibb.co/Pj5qwRS/Google-G-logo-svg.png" alt="" />

                </div>
                <h2 className="text-center">Dont have an account? Please <Link to="/register"><span className="text-[#ff8800]">Register</span></Link></h2>
                <div className="flex justify-center pb-5">
                    <input type="submit" className="btn text-xl px-10" />
                </div>

            </form>
        </div>
    );
};

export default Login;