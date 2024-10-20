import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Booking from './Booking';
import { toast } from 'react-toastify';
import moment from 'moment';

const MyBookings = () => {
    const [Bookings, setBookings] = useState([]);
    const { user } = useContext(AuthContext);


    console.log(user);
    useEffect(() => {
        fetch(`http://localhost:5002/bookings?userId=${user.uid}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBookings(data);
            })
    }, [])
    
    const handleDelete = (id, dateString,date) => {
        const time = dateString
        const currentTime = moment().format();
        const bookingDate = moment(time, 'YYYY-MM-DD');
        const currentDate = moment(currentTime, 'YYYY-MM-DD');
        const daysDifference = bookingDate.diff(currentDate, 'days');
        console.log(daysDifference);
        if (daysDifference > 1) {
            fetch(`http://localhost:5002/bookings/${id}`,
                {
                    method: 'DELETE',
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        if (data.deletedCount > 0) {
                            fetch(`http://localhost:5002/rooms/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ newDate:date,delete:false })
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Response:", data);
                                toast.success("Successfully Deleted")
                                
                            })
                            
                        }
                        setBookings(Bookings.filter(item => item._id !== id));
                    }
                })
        } else if (daysDifference === 1) {

            toast.error("You cannot cancel a booking the previous day");
        }



    }
    return (
        <div className='px-10 py-5 space-y-5'>
            <div className='grid grid-cols-5  border-b-2 border-[#8f602a]  py-5 px-16'>
                <h2 className='text-2xl pon'>Room Description</h2>
                <p className='text-xl bhand'>Date</p>
                <p className='text-xl bhand'>Price PerNight</p>
                <p className='text-xl bhand'>Status</p>
                

            </div>
            <div className='grid grid-cols-1 gap-5'>
                {
                    Bookings.map(item => <Booking handleDelete={handleDelete} BookingInfo={item}></Booking>)
                }
            </div>


        </div>
    );
};

export default MyBookings;