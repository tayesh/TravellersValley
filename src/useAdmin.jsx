import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";



const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin,setIsAdmin]=useState(false);
        fetch("http://localhost:5002/userRoll")
        .then(res=>res.json())
        .then(data=>{
            if(user.uid==data[0].userId){
                setIsAdmin(true)
            }
        })

    return [isAdmin];
};

export default useAdmin;