import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import axios from "axios";



export const AuthContext = createContext(null);
const auth = getAuth(app);


const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const[loading,setLoading]=useState(true);
    const [isAdmin,setIsAdmin]=useState(false);
    useEffect(()=>{
        fetch("http://localhost:5002/userRoll")
        .then(res=>res.json())
        .then(data=>{
            if(user.uid==data[0].userId){
                setIsAdmin(true)
            }
        })

    },[])


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true);
        setIsAdmin(false);
        
        return signOut(auth);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
            
    }
    const updateUserProfile = (name ) => {
        return updateProfile(auth.currentUser,{
            displayName : name
        })
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email:userEmail};
            
            setUser(currentUser);
            console.log(currentUser);

            if(currentUser){
                
                console.log(loggedUser);
            }
            else{
                axios.post('http://localhost:5002/logOut',loggedUser,{withCredentials:true})
                .then(res=>{
                    console.log(res.data);
                })
            }

            setLoading(false);

        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        isAdmin,
        auth,
        user,
        createUser,
        logOut,
        login,
        updateUserProfile,setUser,
        loading,
        
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;