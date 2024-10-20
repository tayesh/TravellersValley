import Banner from "../Banner/Banner";

import { Map, Marker } from "pigeon-maps"
import Newsletter from "../Newsletter/Newsletter";
import Cards from "../Cards/Cards";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Booking from "./Booking";


const Home = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        fetch("http://localhost:5002/userRoll")
            .then(res => res.json())
            .then(data => {
                if (user.uid == data[0].userId) {
                    setIsAdmin(true)
                }
            })

    }, [])
    useEffect(() => {
        fetch("http://localhost:5002/b")
            .then(res => res.json())
            .then(data => {
                setBookings(data);
            })

    }, [])
    if (isAdmin) {
        const handleConfirm = async (id) => {
            await fetch(`http://localhost:5002/b/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetch("http://localhost:5002/b")
                        .then(res => res.json())
                        .then(data => {
                            setBookings(data);
                        })
                })

        }



        return (
            <div className='px-10 py-5 space-y-5'>
                <div className='grid grid-cols-5  border-b-2 border-[#8f602a]  py-5 px-16'>
                    <h2 className='text-2xl pon'>Room Description</h2>
                    <p className='text-xl bhand'>Date</p>
                    <p className='text-xl bhand'>Price PerNight</p>
                    <p className='text-xl bhand'>Status</p>
                    <div></div>


                </div>
                <div className='grid grid-cols-1 gap-5'>
                    {
                        bookings.map(item => <Booking BookingInfo={item} handleConfirm={handleConfirm}></Booking>)
                    }
                </div>


            </div>
        )

    }
    else {
        return (
            <div>
                <Banner></Banner>
                <div className="flex gap-10 p-10 items-center">
                    <Map height={300} defaultCenter={[29.4334847291695, 77.12124894570196]} defaultZoom={11}>
                        <Marker width={50} anchor={[29.4334847291695, 77.12124894570196]} />
                    </Map>
                    <div className="">
                        <h2 className="text-3xl font-semibold pon">Find our Location on the map</h2>
                        <p className="bhand text-xl">In the vast expanse of the world, a simple pin drops, marking our place on the map,<br /> where journeys begin and stories unfold. Longitude and latitude converge, guiding us to the crossroads of discovery, where every coordinate holds a tale.</p>
                    </div>
                </div>
                <Newsletter></Newsletter>
                <Cards></Cards>
            </div>
        );
    }

};

export default Home;
/**
 * https://i.ibb.co/1q51499/contemporary-living-room.jpg
https://i.ibb.co/VMmkCjS/eden-nariobi-most-beautiful-hotels-veranda-1665421284.jpg
https://i.ibb.co/QDdtGCX/lobby-living-room-hotel.jpg
https://i.ibb.co/7b29jtt/luxury-bedroom-design.jpg
https://i.ibb.co/1vPLHpT/maxresdefault.jpg
https://i.ibb.co/KcZ43g5/pillow-bed.jpg
https://i.ibb.co/BCfwv9f/roberto-nickson-emqn-SQw-QQDo-unsplash.jpg
 */