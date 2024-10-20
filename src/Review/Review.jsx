import React from 'react';

const Review = ({review}) => {
    const {content,reviewer}=review
    return (
        <div className='border-2 border-[#8f530f70] p-3 rounded-xl bg-[#ffc98b]'>
            <div className='flex gap-3 items-center'>
                <img className='w-10 rounded-full border-2 border-[#8f540f]' src={reviewer.photo?reviewer.photo:"https://i.ibb.co/rpFyzTh/image.png"} alt="" />
                <h2 className='text-lg pon text-[#8f540f]'>{reviewer.name}</h2>
            </div>
            <p className='ml-14 '>{content}</p>
            <p className='ml-14 text-xs mt-3'>by <span className='bhand text-xs text-gray-600'>{reviewer.email}</span></p>

        </div>
    );
};

export default Review;