import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Card from './Card';

const Cards = () => {
    const rooms = useLoaderData();

    return (
        <div>
            <div className='grid grid-cols-2 gap-5 px-[100px]'>
            {
                rooms.slice(0,4).map(room=><Card room={room}></Card>)

            }

            </div>

            
        </div>
    );
};

export default Cards;