import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import moment from 'moment';
import { toast } from 'react-toastify';

const Card = ({ room }) => {
    const [des, setdes] = useState(room.Description.split(" ").slice(0, 15).join(" "))
    const [see, setSee] = useState(false)
    const { user } = useContext(AuthContext);

    const nav = useNavigate();

    const seeMore = () => {
        if (!see) {
            setdes(room.Description);
            setSee(true);
        }
        else {
            setdes(room.Description.split(" ").slice(0, 15).join(" "));
            setSee(false);
        }

    }
    const handleBook = (event) => {
        event.preventDefault();
        const form = event.target;
        const time = form.date.value;
        const currentTime = moment().format();
        const currentDate = parseInt(currentTime.substring(8, 10));
        const date = parseInt(time.substring(8, 10));
        const month = parseInt(time.substring(6, 8));
        const currentMonth = parseInt(currentTime.substring(6, 8));

        const newBooking = {
            roomId: room._id,
            room:room,
            userId: user.uid,
            dateString:null,
            date: null



        }

        if (month - currentMonth == 0) {
            if (date - currentDate < 0) {
                toast.error("Please choose a valid Date")
            }
            else {
                if (room.AvailableDates.includes(date)) {
                    toast.error("This Date is Already Booked")
                }
                else {

                    newBooking.date = date;
                    newBooking.dateString=time.substring(0, 10)

                }
            }

        }
        else if (month - currentMonth < 0 || month - currentMonth > 1) {

            toast.error("Please choose a valid Date")

        }
        else {
            console.log(date);
            newBooking.date = date;
            newBooking.dateString=time.substring(0, 10)


        }
        if (newBooking.date != null) {
            fetch("http://localhost:5002/bookings", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newBooking),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        fetch(`http://localhost:5002/rooms/${_id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ newDate:newBooking.date,delete:false })
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Response:", data);
                                toast("Booked Successfully");
                                
                            })

                        
                        
                    }
                })

             
        }
    }

    return (
        <div className='flex flex-col bg-[#e0933b56] border-2 border-[#8f602a] rounded-xl p-5'>
            <img onClick={() => {
                nav(`/rooms/${room._id}`)
            }} className=' h-[45vh] mb-6 rounded-t-xl' src={room.RoomImages[0]} alt="" />
            <div className='px-5'>
                <h2 className='text-3xl pon text-[#8f540f] mb-4'>{room.RoomDescription}</h2>
                <p className='bhand text-xl mb-6'>{des} <span onClick={seeMore} className='text-gray-400 hover:cursor-pointer'>{see ? "see less" : "...see more"}</span></p>
                <div className='flex justify-between items-center text-xl'>

                    <p className='bhand text-[#ff8800] font-semibold'>${room.PricePerNight}/Night</p>
                    <p className='pon'>{room.Availability ? "Available" : "Booked"}</p>
                </div>
                <button onClick={user?() => document.getElementById('my_modal_5').showModal():nav("/login")} className='btn bg-[#ff8800] border-none hover:bg-[#ffb056] mt-4 w-full bhand text-xl'>{room.Availability ? "Book Now" : "Book for Later"}</button>

            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleBook}>
                            <input type="date" name="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <input type="submit" className="btn" />
                        </form>
                        <div className="modal-action">
                            <form method="dialog">

                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>


        </div>
    );
};

export default Card;