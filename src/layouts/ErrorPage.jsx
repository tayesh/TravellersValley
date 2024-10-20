import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
    const nav = useNavigate();

    return (
        <div className="w-full h-screen flex flex-col justify-center">
            <img className="mx-auto" src="https://i.ibb.co/sK6LB9t/360-F-636835070-fw-Xa-JYfgioj-O80acta-HFuwu-Vvjpa-QRc6.png" alt="" />
            <h2 className="text-8xl pon mt-0 mb-10 text-center">Ooopsy!!!</h2>
            <div className="flex justify-center">
                <p onClick={()=>{nav("/")}} className="bhand text-xl btn w-[50vw] text-center bg-[#ff8800] hover:bg-[#ffb056]">Lets go Home</p>
            </div>
        </div>
    );
};

export default ErrorPage;