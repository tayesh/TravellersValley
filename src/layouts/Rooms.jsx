import { useLoaderData } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import Card from "../Cards/Card";
import { useEffect, useState } from "react";
import axios from "axios";


const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [priceRange,setPriceRange]= useState("");
    useEffect(()=>{
        fetch(`http://localhost:5002/rooms?maxPrice=${priceRange}`)
        .then(res=>res.json())
        .then(data=>{
            setRooms(data);
        })
    },[priceRange])
    const handleFIlter = (event) => {
        event.preventDefault();
        const form = event.target;
        const pRange = form.priceRange.value;
        setPriceRange(pRange);
        console.log(pRange);
    }
    const handleReset=()=>{
        setPriceRange("");
    }

    return (
        <>
            <form onSubmit={handleFIlter} className="form-control w-full max-w-xs mx-auto">
                <div className="label">
                    <span className="label-text text-xl pon mx-auto">Filter by price range</span>
                </div>
                <input type="text" placeholder="Type here" name="priceRange" className="input input-bordered w-full max-w-xs" />

                <input type="submit" value="Submit" className="btn mt-5 bg-[#ff8800] hover:bg-[#ffb056]" />
                <IoReload onClick={handleReset} className="text-2xl text-[#ff8800] mx-auto mt-5 hover:cursor-pointer hover:text-[#ffb056]" />

            </form>
            <div className="grid grid-cols-2 gap-7 p-10">
                {
                    rooms.map(room => <Card room={room}></Card>)
                }

            </div>
        </>
    );
};

export default Rooms;