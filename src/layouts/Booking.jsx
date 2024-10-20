import React from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAdmin from '../useAdmin';
const Booking = ({ BookingInfo, handleDelete,handleConfirm }) => {
    const { _id, room, dateString, date,ispending } = BookingInfo;
    const isAdmin = useAdmin();
    console.log(isAdmin);
    


    return (
        <div className='grid grid-cols-5 bg-[#e0933b56] border-2 border-[#8f602a] rounded-xl p-5'>
            <h2 className='text-2xl pon'>{room.RoomDescription}</h2>
            <p className='text-xl bhand'>{dateString}</p>
            <p className='text-xl bhand'>{room.PricePerNight}$</p>
            <p className='text-xl bhand'>{ispending ? "pending" : "confirmed"}</p>


            {
                ispending ? (
                    isAdmin[0] ? (
                        <div
                            onClick={() => handleConfirm(_id)}
                            className='flex justify-center items-center bg-green-400 hover:bg-green-600 text-gray-900 font-semibold'
                        >
                            <button className='px-10'>Confirm</button>
                            <RiDeleteBin6Fill className='text-2xl' />
                        </div>
                    ) : (
                        <div
                            onClick={() => handleDelete(_id, dateString, date)}
                            className='flex justify-center items-center bg-red-500 hover:bg-red-600 border-[5px] border-transparent hover:border-red-600 text-gray-900 font-semibold'
                        >
                            <button className='px-10'>DELETE</button>
                            <RiDeleteBin6Fill className='text-2xl' />
                        </div>
                    )
                ) : (
                    <></> // Renders nothing if ispending is false
                )
            }


        </div>
    );
};

export default Booking;