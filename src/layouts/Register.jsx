
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Register = () => {
    const nav = useNavigate()
    const { createUser,updateUserProfile,setUser } = useContext(AuthContext)
    const handleRegister = (event) => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const username = form.uname.value;
         createUser(email, password)
            .then(async result=>{
                console.log(result);
                 await updateUserProfile(username)
                 .then(res=>{
                    setUser(result.user);
                    nav("/")

                 })
                
            })
            .catch(error=>{
                console.log(error);
            })


    }
    return (
        <div>
            <h2 className="text-4xl pon text-center my-10">Register</h2>
            <form onSubmit={handleRegister} className="" >

                <label className="form-control w-full max-w-xs mx-auto mb-3">
                    <div className="label">
                        <span className="label-text text-xl pon text">Enter your Email</span>

                    </div>
                    <input type="text" placeholder="Type here" name="email" className="input input-bordered w-full max-w-xs" />

                </label>
                <label className="form-control w-full max-w-xs mx-auto mb-3">
                    <div className="label">
                        <span className="label-text text-xl pon text">Enter user name</span>

                    </div>
                    <input type="text" placeholder="Type here" name="uname" className="input input-bordered w-full max-w-xs" />

                </label>
                <label className="form-control w-full max-w-xs mx-auto mb-6 ">
                    <div className="label">
                        <span className="label-text text-xl pon text">Enter password</span>
                    </div>
                    <input type="text" placeholder="Type here" name="password" className="input input-bordered w-full max-w-xs" />

                </label>
                <hr className="bg-[#8f540f] h-[2px] w-[330px] border-none mx-auto mb-6" />
                <h2 className="text-center mb-4">Already have an account? Please <Link to="/login"><span className="text-[#ff8800]">Login</span></Link></h2>
                <div className="flex justify-center pb-5">
                    <input type="submit" className="btn text-xl px-10" />
                </div>

            </form>

        </div>
    );
};

export default Register;